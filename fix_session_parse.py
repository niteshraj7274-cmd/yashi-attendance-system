import re

with open('src/components/StaffProfileScreen.tsx', 'r') as f:
    content = f.read()

# Fix the parsing logic
parse_original = """    try {
      const session = JSON.parse(atob(sessionStr));
      setStaffData(session);"""

parse_new = """    try {
      let session;
      try {
        session = JSON.parse(atob(sessionStr));
      } catch (e) {
        session = JSON.parse(sessionStr);
      }
      setStaffData(session);"""

content = content.replace(parse_original, parse_new)

with open('src/components/StaffProfileScreen.tsx', 'w') as f:
    f.write(content)
