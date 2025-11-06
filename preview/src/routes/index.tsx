import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SchemaPreview } from '@/components/SchemaPreview'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/')({
  component: App,
})

const SCHEMAS = [
  {
    id: 'rclone',
    name: 'Rclone Configuration',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/schema.json',
    description: 'Configure your rclone settings with an interactive form based on the latest schema',
  },
] as const

function App() {
  const [selectedSchemaUrl, setSelectedSchemaUrl] = useState<string>(
    SCHEMAS[0]?.url || ''
  )

  const selectedSchema = SCHEMAS.find((s) => s.url === selectedSchemaUrl)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Schema Preview</h1>
        <p className="text-xl text-muted-foreground">
          Preview and configure schemas with interactive forms
        </p>
      </div>

      <div className="mb-8">
        <label htmlFor="schema-select" className="block text-sm font-medium mb-2">
          Select Schema
        </label>
        <Select value={selectedSchemaUrl} onValueChange={setSelectedSchemaUrl}>
          <SelectTrigger id="schema-select" className="w-full max-w-md">
            <SelectValue placeholder="Select a schema" />
          </SelectTrigger>
          <SelectContent>
            {SCHEMAS.map((schema) => (
              <SelectItem key={schema.id} value={schema.url}>
                {schema.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedSchema && (
          <p className="mt-2 text-sm text-muted-foreground">
            {selectedSchema.description}
          </p>
        )}
      </div>

      {selectedSchemaUrl && (
        <SchemaPreview
          schemaUrl={selectedSchemaUrl}
          title={selectedSchema?.name}
          description={selectedSchema?.description}
        />
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Built with React, TanStack Router, and JSON Schema Forms
        </p>
      </div>
    </div>
  )
}
