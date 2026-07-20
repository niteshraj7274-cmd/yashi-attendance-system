import re

with open('src/components/AdminCenterManagementScreen.tsx', 'r') as f:
    content = f.read()

new_content = re.sub(
    r'<option value="200">200 Meter</option>\s*<option value="400">400 Meter</option>\s*<option value="500">500 Meter</option>\s*<option value="700">700 Meter</option>',
    '<option value="300">300 Meter</option>\n                      <option value="500">500 Meter</option>\n                      <option value="700">700 Meter</option>\n                      <option value="999">999 Meter</option>',
    content
)

with open('src/components/AdminCenterManagementScreen.tsx', 'w') as f:
    f.write(new_content)
