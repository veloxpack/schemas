# Rclone JSON Schemas

This directory contains JSON Schema definitions for configuring rclone storage drivers and operations.

## Schema Catalog

### Index & Core
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/index.json` – Complete rclone configuration entry point
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/index.json` – Backend selector and shared metadata

### Options
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/options/configuration.json` – General configuration flags
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/options/mount.json` – Mount command options
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/options/vfs.json` – Virtual file system tuning

### Backends – Cloud Storage
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/local.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/s3.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/drive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/dropbox.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/onedrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/box.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/pcloud.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/mega.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/yandex.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/koofr.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/jottacloud.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/mailru.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/hidrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/sugarsync.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/iclouddrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/protondrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/seafile.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/opendrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/zoho.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/sharefile.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/quatrix.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/filefabric.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/filelu.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/filescom.json`

### Backends – Object Storage
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/azureblob.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/azurefiles.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/b2.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/googlecloudstorage.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/swift.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/storj.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/qingstor.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/oracleobjectstorage.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/netstorage.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/cloudinary.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/imagekit.json`

### Backends – Network Protocols
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/sftp.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/ftp.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/webdav.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/smb.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/http.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/hdfs.json`

### Backends – Special Purpose
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/crypt.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/chunker.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/compress.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/union.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/alias.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/cache.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/combine.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/hasher.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/archive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/memory.json`

### Backends – File Hosting Services
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/fichier.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/internetarchive.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/pikpak.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/putio.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/premiumizeme.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/ulozto.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/uptobox.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/pixeldrain.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/gofile.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/linkbox.json`

### Backends – Other Platforms
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/googlephotos.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/sia.json`
- `https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/doi.json`

### Sample Schemas
- `https://schemas.veloxpack.io/schemas/sample/schema-1.json`
- `https://schemas.veloxpack.io/schemas/sample/schema-2.json`
- `https://schemas.veloxpack.io/schemas/sample/dependencies.json`
- `https://schemas.veloxpack.io/schemas/sample/enumerated-objects.json`

## Form Generation

These schemas are designed for automatic form generation. Key features:

**UI Hints:**
- `title` - Field labels
- `description` - Help text/tooltips
- `examples` - Example values
- `enum` - Dropdown options
- `pattern` - Input validation

**Validation:**
- `required` - Required fields
- `minimum`/`maximum` - Numeric ranges
- `minLength`/`maxLength` - String length
- `format` - Special formats (email, uri, date-time)

**Conditional Display:**
- `if`/`then` - Show/hide fields based on values
- `allOf` - Multiple conditions
- `oneOf` - Mutually exclusive options

## Integration

### With Form Libraries

**React JSON Schema Form:**
```javascript
import Form from "@rjsf/core";
import schema from "https://schemas.veloxpack.io/schemas/rclone/v1.71.2/schema.json";

<Form schema={schema} onSubmit={handleSubmit} />
```

### With Validation Libraries

**AJV (JavaScript):**
```javascript
const Ajv = require("ajv");
const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(config);
```

**jsonschema (Python):**
```python
from jsonschema import validate
import json

with open('schema.json') as f:
    schema = json.load(f)

validate(instance=config, schema=schema)
```

## Schema Standards

All schemas follow:
- **JSON Schema Draft 2020-12**
- Strict validation (`additionalProperties: false`)
- Comprehensive documentation
- Real-world examples
- Platform-specific notes

## Adding New Backends

To add a new backend schema:

1. Create `${rclone_version}/backends/{backend-name}.json`
2. Add to `schema.json` enum and `allOf` conditions:

#### Example: Mapping the S3 backend

```json
{
  "if": {
    "properties": {
      "type": {
        "title": "S3 Backend",
        "const": "s3"
      }
    }
  },
  "then": {
    "properties": {
      "backend": {
        "$ref": "https://schemas.veloxpack.io/schemas/rclone/v1.71.2/backends/s3.json"
      }
    }
  }
}
```

## Validation

Validate configurations using:

```bash
# Using AJV CLI
npx ajv validate -s schema.json -d config.json

# Using jsonschema (Python)
jsonschema -i config.json schema.json
```

## Contributing

When adding new options:
1. Match the source code exactly (option names, defaults, types)
2. Include detailed descriptions from help text
3. Add examples for complex options
4. Note platform-specific options
5. Mark deprecated options

## References

- [JSON Schema Documentation](https://json-schema.org/)
- [Rclone Documentation](https://rclone.org/docs/)
