import fs from 'fs';

let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

content = content.replace("    let unSubCenter: () => void;\n    let unSubStaff: () => void;", "    let unSubCenter: () => void;\n    let unSubStaff: () => void;\n    let unSubSettings: () => void;");

content = content.replace("        const unSubSettings = onSnapshot(settingsRef, (docSnap) => {", "        unSubSettings = onSnapshot(settingsRef, (docSnap) => {");

content = content.replace("if (typeof unSubSettings !== 'undefined') unSubSettings();", "if (unSubSettings) unSubSettings();");

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
