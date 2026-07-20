import re

with open('src/utils/driveUtils.ts', 'r') as f:
    content = f.read()

# Modify uploadFileToDrive signature
content = content.replace(
    'export const uploadFileToDrive = async (\n  file: File, \n  folderName: string, \n  centerId: string, \n  onProgress: (progress: number) => void\n) => {',
    'export const uploadFileToDrive = async (\n  file: File, \n  folderName: string, \n  centerId: string, \n  uploaderId: string,\n  uploaderName: string,\n  onProgress: (progress: number) => void\n) => {'
)

# Modify metadata
content = content.replace(
    "uploaderName: user?.displayName || 'Unknown',\n    uploaderId: user?.uid || 'Unknown',",
    "uploaderName: uploaderName,\n    uploaderId: uploaderId,"
)

# Modify log
content = content.replace(
    "userId: user?.uid,",
    "userId: uploaderId,"
)

with open('src/utils/driveUtils.ts', 'w') as f:
    f.write(content)

with open('src/components/DriveFileManager.tsx', 'r') as f:
    content_ui = f.read()

content_ui = content_ui.replace(
    "await uploadFileToDrive(file, uploadFolder, userCenter || 'admin-center', (prog) => setUploadProgress(prog));",
    "await uploadFileToDrive(file, uploadFolder, userCenter || 'admin-center', userId || 'unknown', userName || 'Admin', (prog) => setUploadProgress(prog));"
)

with open('src/components/DriveFileManager.tsx', 'w') as f:
    f.write(content_ui)

