const fs = require('fs');

let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const regex = /<option value="">Select Duty Type<\/option>([\s\S]*?)<option value="Other">Other<\/option>/g;

const newDropdownOptions = `<option value="">Select Duty Type</option>
                     <option value="Field Visit">Field Visit</option>
                     <option value="Training">Training</option>
                     <option value="Meeting">Meeting</option>
                     <option value="Inspection">Inspection</option>
                     <option value="Mobilization">Mobilization</option>
                     <option value="Government Work">Government Work</option>
                     <option value="Office Work">Office Work</option>
                     <option value="Exam Duty">Exam Duty</option>
                     <option value="Official Tour">Official Tour</option>
                     <option value="Other">Other</option>`;

code = code.replace(regex, newDropdownOptions);
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
console.log("Fixed StaffDashboardScreen Dropdown");
