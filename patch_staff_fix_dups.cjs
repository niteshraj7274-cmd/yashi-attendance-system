const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const match = `{!showForm && (
            <button 
              onClick={() => {
                setFormData({`;

const newMatch = `{!showForm && (
            <button onClick={handleRemoveDuplicates} className="bg-rose-600 text-white p-2 rounded-full shadow-sm text-xs font-bold px-3">
              Fix Dups
            </button>
          )}
          {!showForm && (
            <button 
              onClick={() => {
                setFormData({`;

content = content.replace(match, newMatch);
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
