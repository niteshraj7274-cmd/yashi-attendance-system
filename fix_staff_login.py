with open('src/components/CentreStaffSelectionScreen.tsx', 'a') as f:
    f.write("""
      // Store session
      localStorage.setItem('userSession', JSON.stringify({
        uid: selectedStaff.id,
        role: 'staff',
        centerId: centerId,
        staffId: selectedStaff.staffId || '',
        name: selectedStaff.name || ''
      }));

      // Navigate to staff dashboard
      navigate('/staff-dashboard');

    } catch (err) {
      console.error("Login error", err);
      setPinError('An error occurred during login. Please try again.');
    } finally {
      setPinLoading(false);
    }
  };
""")

print("Appended first part")
