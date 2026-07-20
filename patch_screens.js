const fs = require('fs');

function patchAdminStaffForm() {
  const path = 'src/components/AdminStaffFormScreen.tsx';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    "const q = query(collection(db, 'centers'), where('isDeleted', '==', false));",
    "const q = query(collection(db, 'centers'));"
  );
  content = content.replace(
    "if (data.status === 'Active') {",
    "if (data.status === 'Active' && data.isDeleted !== true) {"
  );
  fs.writeFileSync(path, content);
}

function patchCentreLogin() {
  const path = 'src/components/CentreLoginScreen.tsx';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    "const q = query(\n          collection(db, 'centers'),\n          where('isDeleted', '==', false)\n        );",
    "const q = query(collection(db, 'centers'));"
  );
  content = content.replace(
    "if (doc.data().status === 'Active') {",
    "const data = doc.data();\n          if (data.status === 'Active' && data.isDeleted !== true) {"
  );
  content = content.replace(
    "centerList.push({ id: doc.id, name: doc.data().name });",
    "centerList.push({ id: doc.id, name: data.name });"
  );
  content = content.replace(
    "const validPin = centerData.pin || '1234';",
    "const validPin = centerData.pin || '1234';\n      if (String(pin) === String(validPin)) {"
  );
  content = content.replace(
    "if (pin === validPin) {",
    "// Replaced"
  );
  fs.writeFileSync(path, content);
}

function patchAdminCenterList() {
  const path = 'src/components/AdminCenterListScreen.tsx';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    "const q = query(collection(db, 'centers'), where('isDeleted', '==', false));",
    "const q = query(collection(db, 'centers'));"
  );
  content = content.replace(
    "list.push({ id: doc.id, ...doc.data() } as Center);",
    "const data = doc.data();\n        if (data.isDeleted !== true) {\n          list.push({ id: doc.id, ...data } as Center);\n        }"
  );
  fs.writeFileSync(path, content);
}

function patchAdminStaffList() {
  const path = 'src/components/AdminStaffListScreen.tsx';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(
    "const centerSnap = await getDocs(query(collection(db, 'centers'), where('isDeleted', '==', false)));",
    "const centerSnap = await getDocs(query(collection(db, 'centers')));"
  );
  fs.writeFileSync(path, content);
}

patchAdminStaffForm();
patchCentreLogin();
patchAdminCenterList();
patchAdminStaffList();
console.log("Patched!");
