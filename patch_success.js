import fs from 'fs';

function replaceInFile(filepath, replacements) {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.replaceAll(search, replace);
    }
    if (content !== original) {
        fs.writeFileSync(filepath, content);
        console.log(`Updated ${filepath}`);
    }
}

replaceInFile('src/components/ReportCreateScreen.tsx', [
    ["alert('Report generated successfully by YASHI SKILL PROJECT.');", "alert('Report Generated Successfully.');"]
]);

replaceInFile('src/components/DriveFileManager.tsx', [
    ["alert('File uploaded successfully to YASHI SKILL PROJECT.');", "alert('File Uploaded Successfully.');"]
]);

replaceInFile('src/components/StaffDashboardScreen.tsx', [
    ["title: 'Your IN Attendance has been recorded successfully by YASHI SKILL PROJECT.',", "title: 'Attendance Marked Successfully.',"],
    ["title: 'Your OUT Attendance has been recorded successfully by YASHI SKILL PROJECT.',", "title: 'Attendance Marked Successfully.',"],
    ["Staff Attendance recorded successfully by YASHI SKILL PROJECT.", "Attendance Marked Successfully."]
]);
