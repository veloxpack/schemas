# Rclone JSON Schemas

This directory contains JSON Schema definitions for configuring rclone storage drivers and operations.

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
import schema from "./json-schemas/schema.json";

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

1. Create `backends/{backend-name}.json`
2. Define all backend options from `backend/{backend-name}/{backend-name}.go`
3. Add to `schema.json` enum and `allOf` conditions:

```json
{
  "if": {
    "properties": { "type": { "const": "s3" } }
  },
  "then": {
    "properties": {
      "backend_config": { "$ref": "./backends/s3.json" }
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
