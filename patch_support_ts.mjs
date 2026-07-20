import fs from 'fs';
let content = fs.readFileSync('src/components/SupportScreen.tsx', 'utf8');

content = content.replace(
  "const selectedFiles = Array.from(e.target.files);",
  "const selectedFiles = Array.from(e.target.files) as File[];"
);

content = content.replace(
  "const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);",
  "const totalSize = selectedFiles.reduce((acc: number, file: File) => acc + file.size, 0);"
);

fs.writeFileSync('src/components/SupportScreen.tsx', content);
