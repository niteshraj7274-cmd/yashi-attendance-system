import zipfile
import os

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        if 'dist' in dirs:
            dirs.remove('dist')
        for file in files:
            if file.endswith('.zip'):
                continue
            ziph.write(os.path.join(root, file), 
                       os.path.relpath(os.path.join(root, file), 
                                       os.path.join(path, '.')))

with zipfile.ZipFile('public/yashi-skill-project.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipdir('.', zipf)
