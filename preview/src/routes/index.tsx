import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SchemaPreview } from '@/components/SchemaPreview'
import { ThemeToggle } from '@/components/ThemeToggle'
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
  {
    id: 'rclone-backend-box',
    name: 'Rclone: Box',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/box.json',
    description: 'Box backend configuration',
  },
  {
    id: 'rclone-backend-pcloud',
    name: 'Rclone: pCloud',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/pcloud.json',
    description: 'pCloud backend configuration',
  },
  {
    id: 'rclone-backend-mega',
    name: 'Rclone: MEGA',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/mega.json',
    description: 'MEGA backend configuration',
  },
  {
    id: 'rclone-backend-yandex',
    name: 'Rclone: Yandex Disk',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/yandex.json',
    description: 'Yandex Disk backend configuration',
  },
  {
    id: 'rclone-backend-koofr',
    name: 'Rclone: Koofr',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/koofr.json',
    description: 'Koofr backend configuration',
  },
  {
    id: 'rclone-backend-jottacloud',
    name: 'Rclone: Jottacloud',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/jottacloud.json',
    description: 'Jottacloud backend configuration',
  },
  {
    id: 'rclone-backend-mailru',
    name: 'Rclone: Mail.ru Cloud',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/mailru.json',
    description: 'Mail.ru Cloud backend configuration',
  },
  {
    id: 'rclone-backend-hidrive',
    name: 'Rclone: HiDrive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/hidrive.json',
    description: 'HiDrive backend configuration',
  },
  {
    id: 'rclone-backend-sugarsync',
    name: 'Rclone: SugarSync',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/sugarsync.json',
    description: 'SugarSync backend configuration',
  },
  {
    id: 'rclone-backend-iclouddrive',
    name: 'Rclone: iCloud Drive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/iclouddrive.json',
    description: 'iCloud Drive backend configuration',
  },
  {
    id: 'rclone-backend-protondrive',
    name: 'Rclone: Proton Drive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/protondrive.json',
    description: 'Proton Drive backend configuration',
  },
  {
    id: 'rclone-backend-seafile',
    name: 'Rclone: Seafile',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/seafile.json',
    description: 'Seafile backend configuration',
  },
  {
    id: 'rclone-backend-opendrive',
    name: 'Rclone: OpenDrive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/opendrive.json',
    description: 'OpenDrive backend configuration',
  },
  {
    id: 'rclone-backend-zoho',
    name: 'Rclone: Zoho WorkDrive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/zoho.json',
    description: 'Zoho WorkDrive backend configuration',
  },
  {
    id: 'rclone-backend-sharefile',
    name: 'Rclone: Citrix ShareFile',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/sharefile.json',
    description: 'Citrix ShareFile backend configuration',
  },
  {
    id: 'rclone-backend-quatrix',
    name: 'Rclone: Quatrix',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/quatrix.json',
    description: 'Quatrix backend configuration',
  },
  {
    id: 'rclone-backend-filefabric',
    name: 'Rclone: FileFabric',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/filefabric.json',
    description: 'FileFabric backend configuration',
  },
  {
    id: 'rclone-backend-filelu',
    name: 'Rclone: FileLu',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/filelu.json',
    description: 'FileLu backend configuration',
  },
  {
    id: 'rclone-backend-filescom',
    name: 'Rclone: Files.com',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/filescom.json',
    description: 'Files.com backend configuration',
  },
  // Rclone Backends - Object Storage
  {
    id: 'rclone-backend-azureblob',
    name: 'Rclone: Azure Blob Storage',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/azureblob.json',
    description: 'Azure Blob Storage backend configuration',
  },
  {
    id: 'rclone-backend-azurefiles',
    name: 'Rclone: Azure Files',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/azurefiles.json',
    description: 'Azure Files backend configuration',
  },
  {
    id: 'rclone-backend-b2',
    name: 'Rclone: Backblaze B2',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/b2.json',
    description: 'Backblaze B2 backend configuration',
  },
  {
    id: 'rclone-backend-googlecloudstorage',
    name: 'Rclone: Google Cloud Storage',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/googlecloudstorage.json',
    description: 'Google Cloud Storage backend configuration',
  },
  {
    id: 'rclone-backend-swift',
    name: 'Rclone: OpenStack Swift',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/swift.json',
    description: 'OpenStack Swift backend configuration',
  },
  {
    id: 'rclone-backend-storj',
    name: 'Rclone: Storj',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/storj.json',
    description: 'Storj backend configuration',
  },
  {
    id: 'rclone-backend-qingstor',
    name: 'Rclone: QingStor',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/qingstor.json',
    description: 'QingStor backend configuration',
  },
  {
    id: 'rclone-backend-oracleobjectstorage',
    name: 'Rclone: Oracle Object Storage',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/oracleobjectstorage.json',
    description: 'Oracle Object Storage backend configuration',
  },
  {
    id: 'rclone-backend-netstorage',
    name: 'Rclone: Akamai NetStorage',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/netstorage.json',
    description: 'Akamai NetStorage backend configuration',
  },
  {
    id: 'rclone-backend-cloudinary',
    name: 'Rclone: Cloudinary',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/cloudinary.json',
    description: 'Cloudinary backend configuration',
  },
  {
    id: 'rclone-backend-imagekit',
    name: 'Rclone: ImageKit',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/imagekit.json',
    description: 'ImageKit backend configuration',
  },
  // Rclone Backends - Network Protocols
  {
    id: 'rclone-backend-sftp',
    name: 'Rclone: SFTP',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/sftp.json',
    description: 'SFTP backend configuration',
  },
  {
    id: 'rclone-backend-ftp',
    name: 'Rclone: FTP',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/ftp.json',
    description: 'FTP backend configuration',
  },
  {
    id: 'rclone-backend-webdav',
    name: 'Rclone: WebDAV',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/webdav.json',
    description: 'WebDAV backend configuration',
  },
  {
    id: 'rclone-backend-smb',
    name: 'Rclone: SMB/CIFS',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/smb.json',
    description: 'SMB/CIFS backend configuration',
  },
  {
    id: 'rclone-backend-http',
    name: 'Rclone: HTTP',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/http.json',
    description: 'HTTP backend configuration',
  },
  {
    id: 'rclone-backend-hdfs',
    name: 'Rclone: HDFS',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/hdfs.json',
    description: 'HDFS backend configuration',
  },
  // Rclone Backends - Special Purpose
  {
    id: 'rclone-backend-crypt',
    name: 'Rclone: Encryption',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/crypt.json',
    description: 'Encryption backend configuration',
  },
  {
    id: 'rclone-backend-chunker',
    name: 'Rclone: Chunker',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/chunker.json',
    description: 'Chunker backend configuration',
  },
  {
    id: 'rclone-backend-compress',
    name: 'Rclone: Compress',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/compress.json',
    description: 'Compress backend configuration',
  },
  {
    id: 'rclone-backend-union',
    name: 'Rclone: Union',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/union.json',
    description: 'Union backend configuration',
  },
  {
    id: 'rclone-backend-alias',
    name: 'Rclone: Alias',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/alias.json',
    description: 'Alias backend configuration',
  },
  {
    id: 'rclone-backend-cache',
    name: 'Rclone: Cache',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/cache.json',
    description: 'Cache backend configuration',
  },
  {
    id: 'rclone-backend-combine',
    name: 'Rclone: Combine',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/combine.json',
    description: 'Combine backend configuration',
  },
  {
    id: 'rclone-backend-hasher',
    name: 'Rclone: Hasher',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/hasher.json',
    description: 'Hasher backend configuration',
  },
  {
    id: 'rclone-backend-archive',
    name: 'Rclone: Archive Reader',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/archive.json',
    description: 'Archive Reader backend configuration',
  },
  {
    id: 'rclone-backend-memory',
    name: 'Rclone: Memory',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/memory.json',
    description: 'Memory backend configuration',
  },
  // Rclone Backends - File Hosting Services
  {
    id: 'rclone-backend-fichier',
    name: 'Rclone: 1Fichier',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/fichier.json',
    description: '1Fichier backend configuration',
  },
  {
    id: 'rclone-backend-internetarchive',
    name: 'Rclone: Internet Archive',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/internetarchive.json',
    description: 'Internet Archive backend configuration',
  },
  {
    id: 'rclone-backend-pikpak',
    name: 'Rclone: PikPak',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/pikpak.json',
    description: 'PikPak backend configuration',
  },
  {
    id: 'rclone-backend-putio',
    name: 'Rclone: Put.io',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/putio.json',
    description: 'Put.io backend configuration',
  },
  {
    id: 'rclone-backend-premiumizeme',
    name: 'Rclone: Premiumize.me',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/premiumizeme.json',
    description: 'Premiumize.me backend configuration',
  },
  {
    id: 'rclone-backend-ulozto',
    name: 'Rclone: Uloz.to',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/ulozto.json',
    description: 'Uloz.to backend configuration',
  },
  {
    id: 'rclone-backend-uptobox',
    name: 'Rclone: Uptobox',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/uptobox.json',
    description: 'Uptobox backend configuration',
  },
  {
    id: 'rclone-backend-pixeldrain',
    name: 'Rclone: Pixeldrain',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/pixeldrain.json',
    description: 'Pixeldrain backend configuration',
  },
  {
    id: 'rclone-backend-gofile',
    name: 'Rclone: GoFile',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/gofile.json',
    description: 'GoFile backend configuration',
  },
  {
    id: 'rclone-backend-linkbox',
    name: 'Rclone: Linkbox',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/linkbox.json',
    description: 'Linkbox backend configuration',
  },
  // Rclone Backends - Other
  {
    id: 'rclone-backend-googlephotos',
    name: 'Rclone: Google Photos',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/googlephotos.json',
    description: 'Google Photos backend configuration',
  },
  {
    id: 'rclone-backend-sia',
    name: 'Rclone: Sia',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/sia.json',
    description: 'Sia backend configuration',
  },
  {
    id: 'rclone-backend-doi',
    name: 'Rclone: DOI Repositories',
    url: 'https://schemas.veloxpack.io/schemas/rclone/latest/backends/doi.json',
    description: 'DOI Repositories backend configuration',
  },
  // Sample Schemas
  {
    id: 'sample-1',
    name: 'Sample Nested Object',
    url: 'https://schemas.veloxpack.io/schemas/sample/schema-1.json',
    description: 'A sample nested object for the schema',
  },
  {
    id: 'sample-2',
    name: 'Sample Nested Object 2',
    url: 'https://schemas.veloxpack.io/schemas/sample/schema-2.json',
    description: 'A sample nested object for the schema',
  },

  {
    id: 'sample-3',
    name: 'Schema Dependencies',
    url: 'https://schemas.veloxpack.io/schemas/sample/dependencies.json',
    description: 'A schema with dependencies',
  },
  {
    id: 'sample-4',
    name: 'Enumerated Objects',
    url: 'https://schemas.veloxpack.io/schemas/sample/enumerated-objects.json',
    description: 'A schema with enumerated objects',
  }
] as const

function App() {
  const [selectedSchemaUrl, setSelectedSchemaUrl] = useState<string>(
    SCHEMAS[0]?.url || ''
  )

  const selectedSchema = SCHEMAS.find((s) => s.url === selectedSchemaUrl)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold mb-4">Schema Preview</h1>
          <p className="text-xl text-muted-foreground">
            Preview and configure schemas with interactive forms
          </p>
        </div>
        <div className="flex-shrink-0">
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
