import { useEffect, useState } from 'react';
import type { RJSFSchema } from '@rjsf/utils';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { Resolver } from '@stoplight/json-ref-resolver';
import {withTheme} from '@rjsf/core';
import {Theme as shadcnTheme} from '@rjsf/shadcn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, FileJson, ChevronLeft, ChevronRight } from 'lucide-react';

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

interface Step {
  id: string;
  title: string;
  description?: string;
  schema: RJSFSchema;
  propertyKey: string;
}

interface MultiStepFormProps {
  schemaUrl: string;
  title?: string;
  description?: string;
}

export function MultiStepForm({ schemaUrl, title, description }: MultiStepFormProps) {
  const [schema, setSchema] = useState<RJSFSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepFormData, setCurrentStepFormData] = useState<any>({});

  const resolvedSchemaUrl = import.meta.env.DEV
    ? getLocalSchemaUrl(schemaUrl)
    : schemaUrl;

  useEffect(() => {
    const fetchAndResolveSchema = async () => {
      try {
        setLoading(true);
        setError(null);
        setSchema(null);
        setFormData({});
        setShowResult(false);
        setCurrentStep(0);

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

  // Generate steps from schema
  useEffect(() => {
    if (!schema || !schema.properties) return;

    const generatedSteps: Step[] = [];
    const properties = schema.properties;

    Object.keys(properties).forEach((key) => {
      const prop = properties[key] as RJSFSchema;
      if (prop.type === 'object' || prop.type === 'array') {
        generatedSteps.push({
          id: key,
          title: prop.title || key,
          description: prop.description,
          schema: {
            ...schema,
            properties: {
              [key]: prop
            },
            required: schema.required?.includes(key) ? [key] : []
          },
          propertyKey: key
        });
      }
    });

    setSteps(generatedSteps);
    // Reset to first step when steps change
    setCurrentStep(0);
  }, [schema]);

  // Update current step form data when step changes
  useEffect(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const stepData = steps[currentStep];
      if (stepData) {
        const stepFormData = formData[stepData.propertyKey] || {};
        setCurrentStepFormData(stepFormData);
      }
    }
  }, [currentStep, steps, formData]);

  const handleFormChange = (data: IChangeEvent<any, RJSFSchema, any>) => {
    if (data.formData) {
      setCurrentStepFormData(data.formData);
      const currentStepData = steps[currentStep];
      if (currentStepData) {
        setFormData((prev: any) => ({
          ...prev,
          [currentStepData.propertyKey]: data.formData
        }));
      }
    }
  };

  const handleNext = () => {
    // Save current step data before moving
    const currentStepData = steps[currentStep];
    if (currentStepData) {
      setFormData((prev: any) => ({
        ...prev,
        [currentStepData.propertyKey]: currentStepFormData
      }));
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Reset form data for next step
      const nextStepData = steps[currentStep + 1];
      setCurrentStepFormData(formData[nextStepData?.propertyKey] || {});
    }
  };

  const handlePrevious = () => {
    // Save current step data before moving back
    const currentStepData = steps[currentStep];
    if (currentStepData) {
      setFormData((prev: any) => ({
        ...prev,
        [currentStepData.propertyKey]: currentStepFormData
      }));
    }

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // Load form data for previous step
      const prevStepData = steps[currentStep - 1];
      setCurrentStepFormData(formData[prevStepData?.propertyKey] || {});
    }
  };

  const handleFormSubmit = (data: IChangeEvent<any, RJSFSchema, any>) => {
    const currentStepData = steps[currentStep];
    const updatedData = {
      ...formData,
      [currentStepData.propertyKey]: data.formData
    };

    // Always save the data
    setFormData(updatedData);

    // Only show result if it's the last step
    if (currentStep === steps.length - 1) {
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

  if (!schema || steps.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            {steps.length === 0 && schema
              ? 'No steps available. Schema must have object or array properties to create steps.'
              : 'No schema available'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Step Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : index < currentStep
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className={`text-xs mt-2 text-center max-w-[100px] ${
                    index === currentStep ? 'font-semibold' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle>{currentStepData.title}</CardTitle>
          {currentStepData.description && (
            <CardDescription>{currentStepData.description}</CardDescription>
          )}
          <CardDescription>
            Step {currentStep + 1} of {steps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            schema={currentStepData.schema}
            validator={validator}
            formData={currentStepFormData}
            onChange={handleFormChange}
            onSubmit={handleFormSubmit}
            showErrorList={false}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={handleNext}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  // Save current step data and submit
                  const updatedData = {
                    ...formData,
                    [currentStepData.propertyKey]: currentStepFormData
                  };
                  setFormData(updatedData);
                  setShowResult(true);
                }}
              >
                Submit
                <CheckCircle2 className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
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

