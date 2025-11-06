import { useEffect, useState } from 'react';
import type { RJSFSchema } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Resolver } from '@stoplight/json-ref-resolver';
import {withTheme} from '@rjsf/core';
import {Theme as shadcnTheme} from '@rjsf/shadcn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { AlertCircle, CheckCircle2, FileJson } from 'lucide-react';

const Form = withTheme(shadcnTheme);

// Convert remote schema URL to local path in development
const getLocalSchemaUrl = (url: string): string => {
  if (import.meta.env.DEV) {
    // In dev mode, replace https://schemas.veloxpack.io with local path
    return url.replace('https://schemas.veloxpack.io/schemas', '');
  }
  return url;
};

// Reusable function to resolve HTTP/HTTPS references
const createHttpResolver = () => ({
  resolve: async (ref: any) => {
    try {
      let refUrl = ref.toString();

      // Convert to local path in dev mode
      if (import.meta.env.DEV) {
        refUrl = getLocalSchemaUrl(refUrl);
      }

      console.log('Resolving reference:', refUrl);

      const refResponse = await fetch(refUrl, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!refResponse.ok) {
        throw new Error(
          `Failed to fetch reference ${refUrl}: ${refResponse.status} ${refResponse.statusText}`
        );
      }

      const refData = await refResponse.json();
      return refData;
    } catch (err) {
      console.error(`Error resolving reference ${ref.toString()}:`, err);
      throw err;
    }
  },
});

interface SchemaPreviewProps {
  schemaUrl: string;
  title?: string;
  description?: string;
}

export function SchemaPreview({ schemaUrl, title, description }: SchemaPreviewProps) {
  const [schema, setSchema] = useState<RJSFSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const resolvedSchemaUrl = import.meta.env.DEV
    ? getLocalSchemaUrl(schemaUrl)
    : schemaUrl;

  useEffect(() => {
    const fetchAndResolveSchema = async () => {
      try {
        setLoading(true);
        setError(null);
        setSchema(null);
        setFormData(null);
        setShowResult(false);

        // Fetch the main schema
        const response = await fetch(resolvedSchemaUrl);

        if (!response.ok) {
          throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
        }

        const remoteSchema = await response.json();

        // Create a custom resolver with a fetch reader
        const resolver = new Resolver({
          resolvers: {
            https: createHttpResolver(),
            http: createHttpResolver(),
          },
        });

        // Resolve all $ref references
        const resolvedResult = await resolver.resolve(remoteSchema, {
          baseUri: resolvedSchemaUrl,
        });

        setSchema(resolvedResult.result as RJSFSchema);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching or resolving schema:', err);
      } finally {
        setLoading(false);
      }
    };

    if (resolvedSchemaUrl) {
      fetchAndResolveSchema();
    }
  }, [resolvedSchemaUrl]);

  const handleFormSubmit = (data: IChangeEvent<any, RJSFSchema, any>) => {
    if (data.formData) {
      setFormData(data.formData);
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Spinner className="mb-4 h-8 w-8" />
          <p className="text-muted-foreground">Loading schema...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Error Loading Schema
          </CardTitle>
          <CardDescription className="text-destructive/80">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-foreground mb-2">
              Troubleshooting Tips
            </summary>
            <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Check if the URL is accessible: <code className="text-xs bg-muted px-1 py-0.5 rounded">{resolvedSchemaUrl}</code></li>
              <li>Verify CORS headers are set on the server</li>
              <li>Check browser console for detailed error messages</li>
              <li>Ensure all referenced schemas exist and are accessible</li>
            </ul>
          </details>
        </CardContent>
      </Card>
    );
  }

  if (!schema) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No schema available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Configuration Form</CardTitle>
          <CardDescription>
            Fill out the form to generate your configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            schema={schema}
            validator={validator}
            onSubmit={handleFormSubmit}
          />
        </CardContent>
      </Card>

      {showResult && formData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Configuration Generated
            </CardTitle>
            <CardDescription>
              Your configuration JSON
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[600px] text-sm">
                <code>{JSON.stringify(formData, null, 2)}</code>
              </pre>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error('Failed to copy:', err);
                  }
                }}
                className="mt-4 text-sm text-primary hover:underline flex items-center gap-2 transition-colors"
              >
                <FileJson className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

