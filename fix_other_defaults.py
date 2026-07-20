import re
import glob

files = glob.glob('src/**/*.tsx', recursive=True)
for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Change any fallback to 100 or 300 to 200 for geofenceRadius
    new_content = re.sub(r'center(\??)\.geofenceRadius \|\| 100', r'center\1.geofenceRadius || 200', content)
    new_content = re.sub(r'centerInfo(\??)\.geofenceRadius\) \|\| 300', r'centerInfo\1.geofenceRadius) || 200', new_content)
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
