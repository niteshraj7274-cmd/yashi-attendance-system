const fs = require('fs');

function replaceBack(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace("navigate(-1)", "navigate('/home')");
  fs.writeFileSync(file, content);
}

replaceBack('src/components/AdminLoginScreen.tsx');
replaceBack('src/components/CentreLoginScreen.tsx');
replaceBack('src/components/DeveloperLoginScreen.tsx');
