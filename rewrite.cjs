const fs = require('fs');

let code = fs.readFileSync('src/components/AdminStaffFormScreen.tsx', 'utf8');

// Find start and end of useEffect
const startStr = "  useEffect(() => {";
const endStr = "  }, [id, isEdit, navigate]);";

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr) + endStr.length;

const newUseEffect = `  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const q = query(collection(db, 'centers'));
        const querySnapshot = await getDocs(q);
        const centerList: { id: string, name: string, code: string }[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if ((data.status === 'Active' || !data.status) && data.isDeleted !== true) {
            centerList.push({ id: docSnap.id, name: data.name, code: data.code || '' });
          }
        });
        setCenters(centerList);
      } catch (err) {
        console.error("Error fetching centers:", err);
      }
    };
    fetchCenters();

    if (isEdit && id) {
      const fetchStaff = async () => {
        try {
          const docRef = doc(db, 'staff', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setFormData(docSnap.data() as Staff);
          } else {
            alert('Staff not found');
            navigate('/admin/staff');
          }
        } catch (err) {
          console.error("Error fetching staff:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchStaff();
    } else {
      setLoading(false);
    }
  }, [id, isEdit, navigate]);`;

code = code.substring(0, startIndex) + newUseEffect + code.substring(endIndex);
fs.writeFileSync('src/components/AdminStaffFormScreen.tsx', code);
