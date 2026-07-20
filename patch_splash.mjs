import fs from 'fs';
let content = fs.readFileSync('src/components/SplashScreen.tsx', 'utf8');

content = content.replace(
  'src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"',
  'src="/logo.svg"'
);

// Update colors: Blue background
content = content.replace(
  'bg-slate-900',
  'bg-gradient-to-b from-blue-900 to-blue-700'
);

content = content.replace(
  'bg-slate-800 border-slate-700',
  'bg-white border-blue-500 shadow-xl'
);

content = content.replace(
  'text-slate-400',
  'text-blue-200'
);

content = content.replace(
  'border-slate-600 border-t-white',
  'border-blue-400 border-t-white'
);

fs.writeFileSync('src/components/SplashScreen.tsx', content);
