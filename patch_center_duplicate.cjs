const fs = require('fs');
const path = 'src/components/AdminCenterFormScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('const isSubmitting = React.useRef(false);')) {
  content = content.replace(
    "const [centers, setCenters] = useState<any[]>([]);",
    "const isSubmitting = React.useRef(false);\n  const [centers, setCenters] = useState<any[]>([]);"
  );
  
  if (!content.includes('const isSubmitting = React.useRef(false);')) {
     // fallback injection
     content = content.replace(
       "const [saving, setSaving] = useState(false);",
       "const [saving, setSaving] = useState(false);\n  const isSubmitting = React.useRef(false);"
     );
  }

  content = content.replace(
    "const handleSave = async (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!formData.name",
    "const handleSave = async (e: React.FormEvent) => {\n    e.preventDefault();\n    if (saving || isSubmitting.current) return;\n    if (!formData.name"
  );

  content = content.replace(
    "setSaving(true);\n    setError('');",
    "isSubmitting.current = true;\n    setSaving(true);\n    setError('');"
  );

  // If there's any early return because of duplicate checks:
  content = content.replace(
    "setError('Center Code already exists! Must be unique.');\n        setSaving(false);",
    "setError('Center Code already exists! Must be unique.');\n        isSubmitting.current = false;\n        setSaving(false);"
  );

  content = content.replace(
    "setError('Failed to save center');\n      setSaving(false);",
    "setError('Failed to save center');\n      isSubmitting.current = false;\n      setSaving(false);"
  );

  fs.writeFileSync(path, content);
}
