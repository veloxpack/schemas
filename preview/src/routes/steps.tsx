import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { MultiStepForm } from '@/components/MultiStepForm'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/steps')({
  component: StepsPage,
})

const SCHEMAS = [
  {
    id: 'core-index',
    name: 'Veloxpack Core: Library',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/index.json',
    description: 'Explore the v1alpha1 Veloxpack core schema collection.',
  },
  {
    id: 'core-profiles',
    name: 'Veloxpack Core: Profiles',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/profiles/index.json',
    description: 'Reusable audio, video, and workload profile definitions.',
  },
  {
    id: 'core-audio',
    name: 'Veloxpack Core: Audio',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/audio/index.json',
    description: 'Audio-specific configuration schemas including channel layouts.',
  },
  {
    id: 'core-inputs',
    name: 'Veloxpack Core: Inputs',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/mediainput/index.json',
    description: 'Input configuration schemas for ingesting media.',
  },
  {
    id: 'core-pipelines',
    name: 'Veloxpack Core: Pipelines',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/pipelines/index.json',
    description: 'Schemas for orchestrating pipeline definition and workflows.',
  },
  {
    id: 'core-video',
    name: 'Veloxpack Core: Video',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/video/index.json',
    description: 'Video-specific configuration schemas including resolution profiles.',
  },
  {
    id: 'core-jobs',
    name: 'Veloxpack Core: Jobs',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/jobs/index.json',
    description: 'Execution job specifications for running pipelines.',
  },
  {
    id: 'core-tools',
    name: 'Veloxpack Core: Tools',
    url: 'https://schemas.veloxpack.io/schemas/core/v1alpha1/tools/index.json',
    description: 'Reusable processing tools shared across workloads.',
  },
  {
    id: 'rclone-index',
    name: 'Rclone: Full Schema',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/index.json',
    description: 'Configure rclone remotes with simplified form interface',
  },
  {
    id: 'rclone-backend-types',
    name: 'Rclone: Backend',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/index.json',
    description: 'Choose your backend',
  },
  // Rclone Options
  {
    id: 'rclone-configuration-options',
    name: 'Rclone: Configuration Options',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/options/configuration.json',
    description: 'General rclone configuration options',
  },
  {
    id: 'rclone-mount-options',
    name: 'Rclone: Mount Options',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/options/mount.json',
    description: 'Options for mounting remotes as filesystems',
  },
  {
    id: 'rclone-vfs-options',
    name: 'Rclone: VFS Options',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/options/vfs.json',
    description: 'Virtual File System options for remotes',
  },
  // Rclone Backends - Cloud Storage
  {
    id: 'rclone-backend-local',
    name: 'Rclone: Local Filesystem',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/local.json',
    description: 'Local filesystem backend configuration',
  },
  {
    id: 'rclone-backend-s3',
    name: 'Rclone: Amazon S3',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/s3.json',
    description: 'Amazon S3 backend configuration',
  },
  {
    id: 'rclone-backend-drive',
    name: 'Rclone: Google Drive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/drive.json',
    description: 'Google Drive backend configuration',
  },
  {
    id: 'rclone-backend-dropbox',
    name: 'Rclone: Dropbox',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/dropbox.json',
    description: 'Dropbox backend configuration',
  },
  {
    id: 'rclone-backend-onedrive',
    name: 'Rclone: Microsoft OneDrive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/onedrive.json',
    description: 'Microsoft OneDrive backend configuration',
  },
] as const

function StepsPage() {
  const [selectedSchemaUrl, setSelectedSchemaUrl] = useState<string>(
    SCHEMAS[0]?.url || ''
  )

  const selectedSchema = SCHEMAS.find((s) => s.url === selectedSchemaUrl)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold mb-4">Multi-Step Form</h1>
          <p className="text-xl text-muted-foreground">
            Configure schemas with a step-by-step wizard interface
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline">Single Form</Button>
          </Link>
          <ThemeToggle />
        </div>
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
        <MultiStepForm
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

