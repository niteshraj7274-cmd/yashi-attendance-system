import re

with open('src/components/DriveFileManager.tsx', 'r') as f:
    content = f.read()

log_download = """
  const handlePreview = async (file: any) => {
    try {
      await addDoc(collection(db, 'drive_activity_logs'), {
        action: 'preview/download',
        fileId: file.driveFileId,
        fileName: file.name,
        userId: userId,
        timestamp: serverTimestamp()
      });
    } catch(e) {}
    window.open(file.shareableLink, '_blank');
  };
"""

content = content.replace("const handleDelete = async", "import { addDoc, serverTimestamp } from 'firebase/firestore';\n" + log_download + "\n  const handleDelete = async")

content = content.replace('href={file.shareableLink} target="_blank" rel="noopener noreferrer"', 'onClick={(e) => { e.preventDefault(); handlePreview(file); }}')
content = content.replace('<a onClick', '<button onClick')
content = content.replace('</a>', '</button>')

with open('src/components/DriveFileManager.tsx', 'w') as f:
    f.write(content)

