with open('src/App.tsx', 'r') as f:
    content = f.read()

if '<Route path="/drive"' not in content:
    content = content.replace('<Route path="/admin-dashboard"', '<Route path="/drive" element={<ProtectedRoute role="admin"><DriveFileManager /></ProtectedRoute>} />\n              <Route path="/admin-dashboard"')

with open('src/App.tsx', 'w') as f:
    f.write(content)
