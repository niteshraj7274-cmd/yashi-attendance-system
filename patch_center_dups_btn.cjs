const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const match = `            <button 
              onClick={() => {
                setFormData({
                  name: '',
                  code: '',`;

const newMatch = `            <button onClick={handleRemoveDuplicates} className="bg-rose-600 text-white p-2 rounded-full shadow-sm text-xs font-bold px-3 mr-2">
              Fix Dups
            </button>
          )}
          {!showForm && (
            <button 
              onClick={() => {
                setFormData({
                  name: '',
                  code: '',`;

content = content.replace(match, newMatch);
fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
