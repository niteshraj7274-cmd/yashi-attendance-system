with open('src/App.tsx', 'r') as f:
    content = f.read()

import_stmt = "const DriveFileManager = lazy(() => import('./components/DriveFileManager'));"
if import_stmt not in content:
    content = content.replace("const AiSupportScreen = lazy(() => import('./components/AiSupportScreen'));",
                              "const AiSupportScreen = lazy(() => import('./components/AiSupportScreen'));\n" + import_stmt)

route_stmt = "<Route path=\"/drive\" element={<DriveFileManager />} />"
if route_stmt not in content:
    content = content.replace("<Route path=\"/ai-support\"",
                              route_stmt + "\n              <Route path=\"/ai-support\"")

with open('src/App.tsx', 'w') as f:
    f.write(content)
