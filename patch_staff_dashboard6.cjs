const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const catchBlock1 = `        } catch (err) {
          console.error(err);
          alert("An error occurred while saving attendance.");
        } finally {`;
const newCatchBlock1 = `        } catch (err) {
          console.error(err);
          sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'Attendance Failed', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, (err as any)?.message || 'Unknown error', 0);
          alert("An error occurred while saving attendance.");
        } finally {`;
if (!code.includes("'Attendance Failed'")) {
    code = code.replaceAll(catchBlock1, newCatchBlock1);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
