import re

def insert_menu(file_path, insert_text):
    with open(file_path, 'r') as f:
        content = f.read()
    
    if insert_text in content: return

    if 'const menuItems = [' in content:
        content = content.replace('const menuItems = [', f'const menuItems = [\n{insert_text}')
    elif 'const dashboardItems = [' in content:
        content = content.replace('const dashboardItems = [', f'const dashboardItems = [\n{insert_text}')
    else:
        # Just find the first array of items and insert
        pass

    with open(file_path, 'w') as f:
        f.write(content)

insert_menu('src/components/AdminDashboardScreen.tsx', "    { label: 'Google Drive Files', icon: FileText, path: '/drive', color: 'bg-emerald-600', module: 'all' },\n")
insert_menu('src/components/CentreAttendanceDashboardScreen.tsx', "    { label: 'Drive Files', icon: FileText, path: '/drive', color: 'bg-blue-600', module: 'all' },\n")
insert_menu('src/components/StaffDashboardScreen.tsx', "    { label: 'Drive Files', icon: FileText, path: '/drive', color: 'bg-indigo-600' },\n")

