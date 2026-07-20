import fs from 'fs';
let lines = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8').split('\n');
// Let's just remove lines 627, 628, 629
// But first check if they actually have these redeclarations.

let out = [];
let captureAndSubmitBlock = false;
let seenInCaptureAndSubmit = false;

for(let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const captureAndSubmit = async')) {
    captureAndSubmitBlock = true;
  }
  
  if (captureAndSubmitBlock && lines[i].includes('const today = new Date();')) {
    if (seenInCaptureAndSubmit) {
      // skip this and next 2 lines
      i += 2;
      continue;
    } else {
      seenInCaptureAndSubmit = true;
    }
  }

  // Same for processLocationOnlyAttendance ? Let's check
  // wait, the error only mentions 551, 552, 553, 627, 628, 629. 
  // Let's just replace all instances of "const today = new Date();" with a check.
  // Actually, wait, it's a block scoped variable error. I can just change it to let/var or rename, or better just remove the second one.

  out.push(lines[i]);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', out.join('\n'));
