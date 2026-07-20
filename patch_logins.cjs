const fs = require('fs');

function patchFile(file, match, code) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(code)) return; // already patched
  content = content.replace(match, match + '\n' + code);
  fs.writeFileSync(file, content);
}

patchFile(
  'src/components/AdminLoginScreen.tsx',
  'const { syncData, isSyncing } = useSync();',
  `  React.useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.role === 'admin') {
          navigate('/admin-dashboard');
        }
      } catch(e) {}
    }
  }, [navigate]);`
);

patchFile(
  'src/components/CentreLoginScreen.tsx',
  "const [error, setError] = useState('');",
  `  React.useEffect(() => {
    const sessionStr = localStorage.getItem('centreSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.centerId) {
          navigate(\`/centre/\${session.centerId}/staff\`);
        }
      } catch(e) {}
    }
  }, [navigate]);`
);

patchFile(
  'src/components/DeveloperLoginScreen.tsx',
  "const [error, setError] = useState('');",
  `  React.useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (sessionStr) {
      try {
        const session = JSON.parse(atob(sessionStr));
        if (session.role === 'developer') {
          navigate('/developer-settings');
        }
      } catch(e) {}
    }
  }, [navigate]);`
);
