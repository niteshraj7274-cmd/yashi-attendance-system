const fs = require('fs');
let content = fs.readFileSync('src/components/AdminJobRequirementsScreen.tsx', 'utf8');

if (!content.includes('useLocation')) {
  content = content.replace(
    "import { useNavigate } from 'react-router-dom';",
    "import { useNavigate, useLocation } from 'react-router-dom';"
  );
}

content = content.replace(
  "const navigate = useNavigate();",
  "const navigate = useNavigate();\n  const location = useLocation();"
);

content = content.replace(
  "const [showForm, setShowForm] = useState(false);",
  "const [showForm, setShowForm] = useState(location.state?.openNew || false);"
);

// We should also replace state typing if missing
fs.writeFileSync('src/components/AdminJobRequirementsScreen.tsx', content);
