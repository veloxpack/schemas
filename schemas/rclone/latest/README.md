# Rclone JSON Schemas

This directory contains JSON Schema definitions for configuring rclone storage drivers and operations.

## Schema Catalog

### Index & Core
- `https://schemas.veloxpack.io/schemas/rclone/latest/index.json` – Complete rclone configuration entry point
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/index.json` – Backend selector and shared metadata

### Options
- `https://schemas.veloxpack.io/schemas/rclone/latest/options/configuration.json` – General configuration flags
- `https://schemas.veloxpack.io/schemas/rclone/latest/options/mount.json` – Mount command options
- `https://schemas.veloxpack.io/schemas/rclone/latest/options/vfs.json` – Virtual file system tuning

### Backends – Cloud Storage
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/local.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/s3.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/drive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/dropbox.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/onedrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/box.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/pcloud.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/mega.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/yandex.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/koofr.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/jottacloud.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/mailru.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/hidrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/sugarsync.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/iclouddrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/protondrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/seafile.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/opendrive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/zoho.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/sharefile.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/quatrix.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/filefabric.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/filelu.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/filescom.json`

### Backends – Object Storage
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/azureblob.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/azurefiles.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/b2.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/googlecloudstorage.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/swift.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/storj.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/qingstor.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/oracleobjectstorage.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/netstorage.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/cloudinary.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/imagekit.json`

### Backends – Network Protocols
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/sftp.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/ftp.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/webdav.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/smb.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/http.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/hdfs.json`

### Backends – Special Purpose
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/crypt.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/chunker.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/compress.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/union.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/alias.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/cache.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/combine.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/hasher.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/archive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/memory.json`

### Backends – File Hosting Services
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/fichier.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/internetarchive.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/pikpak.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/putio.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/premiumizeme.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/ulozto.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/uptobox.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/pixeldrain.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/gofile.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/linkbox.json`

### Backends – Other Platforms
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/googlephotos.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/sia.json`
- `https://schemas.veloxpack.io/schemas/rclone/latest/backends/doi.json`

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
import schema from "https://schemas.veloxpack.io/schemas/rclone/latest/schema.json";

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
        "$ref": "https://schemas.veloxpack.io/schemas/rclone/latest/backends/s3.json"
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
