import re

with open('src/hooks/useActiveCenters.ts', 'r') as f:
    content = f.read()

# Add import for doc, setDoc
content = content.replace("from 'firebase/firestore';", "from 'firebase/firestore';\nimport { doc, setDoc } from 'firebase/firestore';")

# Add creation logic
creation_logic = """
      if (querySnapshot.empty) {
        // Create default center if none exists
        const defaultCenter = {
          name: 'Main Center',
          code: 'C001',
          pin: '1234',
          status: 'Active',
          district: 'Headquarters',
          latitude: 0,
          longitude: 0,
          geofenceRadius: 500,
          createdAt: new Date().toISOString()
        };
        const newRef = doc(collection(db, 'centers'));
        setDoc(newRef, defaultCenter).catch(console.error);
        return; // onSnapshot will trigger again
      }
"""

content = content.replace("const centerList:", creation_logic + "      const centerList:")

with open('src/hooks/useActiveCenters.ts', 'w') as f:
    f.write(content)

