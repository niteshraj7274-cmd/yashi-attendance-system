import { ErrorBoundary } from "./components/ErrorBoundary";
import ProtectedRoute from './components/ProtectedRoute';
import JobProtectedRoute from './components/JobProtectedRoute';
import AdminStorageScreen from './components/AdminStorageScreen';
import AdminDeviceManagementScreen from './components/AdminDeviceManagementScreen';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MaintenanceWrapper from './components/MaintenanceWrapper';
const SplashScreen = lazy(() => import('./components/SplashScreen'));
const HomeScreen = lazy(() => import('./components/HomeScreen'));
const SupportScreen = lazy(() => import('./components/SupportScreen'));
const CentreLoginScreen = lazy(() => import('./components/CentreLoginScreen'));
const AdminLoginScreen = lazy(() => import('./components/AdminLoginScreen'));




const AdminDashboardScreen = lazy(() => import('./components/AdminDashboardScreen'));
const AdminProfessionalDashboardScreen = lazy(() => import('./components/AdminProfessionalDashboardScreen'));
const AdminUpdateSettingsScreen = lazy(() => import('./components/AdminUpdateSettingsScreen'));
const AdminCenterManagementScreen = lazy(() => import('./components/AdminCenterManagementScreen'));
const AdminStaffManagementScreen = lazy(() => import('./components/AdminStaffManagementScreen'));
const ReportManagementScreen = lazy(() => import('./components/ReportManagementScreen'));
const ReportCreateScreen = lazy(() => import('./components/ReportCreateScreen'));
const ReportManageScreen = lazy(() => import('./components/ReportManageScreen'));
const ReportAssignmentScreen = lazy(() => import('./components/ReportAssignmentScreen'));
const AdminRequestManagementScreen = lazy(() => import('./components/AdminRequestManagementScreen'));
const AdminProfileScreen = lazy(() => import('./components/AdminProfileScreen'));
const AdminAttendanceDashboardScreen = lazy(() => import('./components/AdminAttendanceDashboardScreen'));
const AdminReportsScreen = lazy(() => import('./components/AdminReportsScreen'));
const AdminSettingsScreen = lazy(() => import('./components/AdminSettingsScreen'));
const AdminAttendanceGuideScreen = lazy(() => import('./components/AdminAttendanceGuideScreen'));
const CentreAttendanceGuideScreen = lazy(() => import('./components/CentreAttendanceGuideScreen'));
const CentreAttendanceDashboardScreen = lazy(() => import('./components/CentreAttendanceDashboardScreen'));
const AdminSupportScreen = lazy(() => import('./components/AdminSupportScreen'));
const AdminOfficialDutyScreen = lazy(() => import('./components/AdminOfficialDutyScreen'));
const AdminOutsideAlertsScreen = lazy(() => import('./components/AdminOutsideAlertsScreen'));
const AdminAttendanceTimingScreen = lazy(() => import('./components/AdminAttendanceTimingScreen'));
const AdminJobRequirementsScreen = lazy(() => import('./components/AdminJobRequirementsScreen'));
const AdminJobCategoriesScreen = lazy(() => import('./components/AdminJobCategoriesScreen'));
const AdminJobApplicationsScreen = lazy(() => import('./components/AdminJobApplicationsScreen'));

const JobRequirementPortalScreen = lazy(() => import('./components/JobRequirementPortalScreen'));
const JobAdminLoginScreen = lazy(() => import('./components/JobAdminLoginScreen'));
const JobAdminDashboardScreen = lazy(() => import('./components/JobAdminDashboardScreen'));
const PublicJobListScreen = lazy(() => import('./components/PublicJobListScreen'));
const PublicJobApplyScreen = lazy(() => import('./components/PublicJobApplyScreen'));

const AdminCenterwiseAttendanceScreen = lazy(() => import('./components/AdminCenterwiseAttendanceScreen'));
const AdminMISReportScreen = lazy(() => import('./components/AdminMISReportScreen'));
const AdminSalaryDashboardScreen = lazy(() => import('./components/AdminSalaryDashboardScreen'));
const AdminSalaryHolidayScreen = lazy(() => import('./components/AdminSalaryHolidayScreen'));
const AdminAuditLogScreen = lazy(() => import('./components/AdminAuditLogScreen'));
const AdminSecurityDashboardScreen = lazy(() => import('./components/AdminSecurityDashboardScreen'));
const AdminBackupRestoreScreen = lazy(() => import('./components/AdminBackupRestoreScreen'));

const AdminLoginHistoryScreen = lazy(() => import('./components/AdminLoginHistoryScreen'));
const AdminErrorLogsScreen = lazy(() => import('./components/AdminErrorLogsScreen'));

const DriveFileManager = lazy(() => import('./components/DriveFileManager'));


const DebugScreen = lazy(() => import('./components/DebugScreen'));
const StaffDashboardScreen = lazy(() => import('./components/StaffDashboardScreen'));
const StaffProfileScreen = lazy(() => import('./components/StaffProfileScreen'));
const StaffLeaveScreen = lazy(() => import('./components/StaffLeaveScreen'));
const CentreLeaveScreen = lazy(() => import('./components/CentreLeaveScreen'));
const CentreOfficialDutyScreen = lazy(() => import('./components/CentreOfficialDutyScreen'));
const AdminLeaveScreen = lazy(() => import('./components/AdminLeaveScreen'));
const RaiseTicketScreen = lazy(() => import('./components/RaiseTicketScreen'));
const CentreStaffSelectionScreen = lazy(() => import('./components/CentreStaffSelectionScreen'));
const CentreSalaryScreen = lazy(() => import('./components/CentreSalaryScreen'));
const TextScreen = lazy(() => import('./components/TextScreen'));
const WhatsAppButton = lazy(() => import('./components/WhatsAppButton'));
const DeveloperSettingsScreen = lazy(() => import('./components/DeveloperSettingsScreen'));
const DeveloperLoginScreen = lazy(() => import('./components/DeveloperLoginScreen'));

const ReportAdminLoginScreen = lazy(() => import('./components/ReportAdminLoginScreen'));
const ReportClientLoginScreen = lazy(() => import('./components/ReportClientLoginScreen'));
const ReportAdminDashboardScreen = lazy(() => import('./components/ReportAdminDashboardScreen'));

const AdminDmrSettingsScreen = lazy(() => import('./components/AdminDmrSettingsScreen'));
const AdminDmrDashboardScreen = lazy(() => import('./components/AdminDmrDashboardScreen'));
const DmrFillScreen = lazy(() => import('./components/DmrFillScreen'));

const ReportClientDashboardScreen = lazy(() => import('./components/ReportClientDashboardScreen'));
import ReportAdminProtectedRoute from './components/ReportAdminProtectedRoute';
import ReportClientProtectedRoute from './components/ReportClientProtectedRoute';


const AdminLiveMonitorScreen = lazy(() => import('./components/AdminLiveMonitorScreen'));
const AdminNotificationsScreen = lazy(() => import('./components/AdminNotificationsScreen'));
import AutoOutDaemon from "./components/AutoOutDaemon";
import GlobalWelcomeScreen from "./components/GlobalWelcomeScreen";

import SessionManager from './components/SessionManager';

export default function App() {
  return (
    <ErrorBoundary><BrowserRouter>
      <AutoOutDaemon />
      <GlobalWelcomeScreen />
      <SessionManager>
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 border-x border-slate-200 shadow-2xl relative flex flex-col font-sans overflow-hidden">
        <Suspense fallback={
          <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-slate-500 uppercase tracking-widest">Loading</p>
          </div>
        }>
          <MaintenanceWrapper>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/report-management" element={<ReportManagementScreen />} />

              <Route path="/report-management/admin-login" element={<ReportAdminLoginScreen />} />
              <Route path="/report-management/client-login" element={<ReportClientLoginScreen />} />
              <Route path="/report-management/admin-dashboard" element={<ReportAdminProtectedRoute><ReportAdminDashboardScreen /></ReportAdminProtectedRoute>} />
              <Route path="/report-management/client-dashboard" element={<ReportClientProtectedRoute><ReportClientDashboardScreen /></ReportClientProtectedRoute>} />

              <Route path="/report-management/create" element={<ReportAdminProtectedRoute><ReportCreateScreen /></ReportAdminProtectedRoute>} />
              <Route path="/report-management/manage" element={<ReportAdminProtectedRoute><ReportManageScreen /></ReportAdminProtectedRoute>} />
                                          <Route path="/report-management/assignment" element={<ReportAdminProtectedRoute><ReportAssignmentScreen /></ReportAdminProtectedRoute>} />
              <Route path="/support" element={<SupportScreen />} />
              <Route path="/raise-ticket" element={<RaiseTicketScreen />} />
              <Route path="/centre-login" element={<CentreLoginScreen />} />
              <Route path="/admin-login" element={<AdminLoginScreen />} />
                            
              
              
              
              
              
<Route path="/drive" element={<ProtectedRoute role="admin"><DriveFileManager /></ProtectedRoute>} />
              <Route path="/admin/professional-dashboard" element={<ProtectedRoute role="admin"><AdminProfessionalDashboardScreen /></ProtectedRoute>} />
              <Route path="/admin/update-settings" element={<ProtectedRoute role="admin"><AdminUpdateSettingsScreen /></ProtectedRoute>} />
              <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboardScreen /></ProtectedRoute>} />
              <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfileScreen /></ProtectedRoute>} />
              <Route path="/admin/attendance-timing" element={<ProtectedRoute role="admin"><AdminAttendanceTimingScreen /></ProtectedRoute>} />
                                                                                                                <Route path="/admin/attendance-dashboard" element={<ProtectedRoute role="admin"><AdminAttendanceDashboardScreen /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReportsScreen /></ProtectedRoute>} />
              <Route path="/admin/centerwise-attendance" element={<ProtectedRoute role="admin"><AdminCenterwiseAttendanceScreen /></ProtectedRoute>} />
              <Route path="/admin/mis-report" element={<ProtectedRoute role="admin"><AdminMISReportScreen /></ProtectedRoute>} />
          <Route path="/admin/salary-dashboard" element={<ProtectedRoute role="admin"><AdminSalaryDashboardScreen /></ProtectedRoute>} />
          <Route path="/admin/salary-holiday-calendar" element={<ProtectedRoute role="admin"><AdminSalaryHolidayScreen /></ProtectedRoute>} />
          <Route path="/admin/audit-logs" element={<ProtectedRoute role="admin"><AdminAuditLogScreen /></ProtectedRoute>} />
          <Route path="/admin/security-dashboard" element={<ProtectedRoute role="admin"><AdminSecurityDashboardScreen /></ProtectedRoute>} />
          <Route path="/admin/backup-restore" element={<ProtectedRoute role="admin"><AdminBackupRestoreScreen /></ProtectedRoute>} />
          <Route path="/admin/login-history" element={<ProtectedRoute role="admin"><AdminLoginHistoryScreen /></ProtectedRoute>} />
                    <Route path="/admin/error-logs" element={<ProtectedRoute role="admin"><AdminErrorLogsScreen /></ProtectedRoute>} />



              <Route path="/admin/settings" element={<ProtectedRoute role="admin"><AdminSettingsScreen /></ProtectedRoute>} />
          <Route path="/admin/attendance-guide" element={<ProtectedRoute role="admin"><AdminAttendanceGuideScreen /></ProtectedRoute>} />
              <Route path="/admin/live-monitor" element={<ProtectedRoute role="admin"><AdminLiveMonitorScreen /></ProtectedRoute>} />
              <Route path="/admin/notifications" element={<ProtectedRoute role="admin"><AdminNotificationsScreen /></ProtectedRoute>} />
              <Route path="/admin/support-management" element={<ProtectedRoute role="admin"><AdminSupportScreen /></ProtectedRoute>} />
              <Route path="/admin/requests" element={<ProtectedRoute role="admin"><AdminRequestManagementScreen /></ProtectedRoute>} />
              <Route path="/admin/outside-alerts" element={<ProtectedRoute role="admin"><AdminOutsideAlertsScreen /></ProtectedRoute>} />
          <Route path="/admin/job-requirements" element={<JobProtectedRoute><AdminJobRequirementsScreen /></JobProtectedRoute>} />
                    <Route path="/admin/job-categories" element={<JobProtectedRoute><AdminJobCategoriesScreen /></JobProtectedRoute>} />
          <Route path="/admin/job-applications" element={<JobProtectedRoute><AdminJobApplicationsScreen /></JobProtectedRoute>} />

          <Route path="/job-requirements-portal" element={<JobRequirementPortalScreen />} />
          <Route path="/job-admin-login" element={<JobAdminLoginScreen />} />
          <Route path="/job-admin-dashboard" element={<JobAdminDashboardScreen />} />
          <Route path="/public-jobs" element={<PublicJobListScreen />} />
          <Route path="/apply-job/:jobId" element={<PublicJobApplyScreen />} />

              <Route path="/debug" element={<DebugScreen />} />
              <Route path="/staff/leave" element={<StaffLeaveScreen />} />
              <Route path="/centre/:centerId/leave" element={<CentreLeaveScreen />} />
              <Route path="/centre/:centerId/duty" element={<CentreOfficialDutyScreen />} />
              <Route path="/centre/:centerId/dashboard" element={<CentreAttendanceDashboardScreen />} />
              
              <Route path="/centre/:centerId/staff" element={<CentreStaffSelectionScreen />} />
              <Route path="/centre/:centerId/salary" element={<CentreSalaryScreen />} />
              <Route path="/centre/:centerId/attendance-guide" element={<CentreAttendanceGuideScreen />} />
              <Route path="/staff-dashboard" element={<StaffDashboardScreen />} />
              <Route path="/staff-profile" element={<StaffProfileScreen />} />
              <Route path="/privacy" element={<TextScreen title="Privacy Policy" content="YASHI SKILL PROJECT PVT. LTD. respects your privacy. All location and attendance data is collected strictly for operational monitoring. Data is securely stored and never shared with unauthorized third parties." />} />
              <Route path="/version" element={<TextScreen title="App Version" content="YASHI SKILL PROJECT PVT. LTD.\nLive Attendance System\n\nVersion 1.0.0 (Production)\nBuild: 20260709" />} />
              <Route path="/developer-login" element={<DeveloperLoginScreen />} />
              <Route path="/developer-settings" element={<ProtectedRoute role="developer"><DeveloperSettingsScreen /></ProtectedRoute>} />
            <Route path="/admin/centers" element={<ProtectedRoute role="admin"><AdminCenterManagementScreen /></ProtectedRoute>} />
          <Route path="/admin/staff" element={<ProtectedRoute role="admin"><AdminStaffManagementScreen /></ProtectedRoute>} />
          <Route path="/admin/device-management" element={<ProtectedRoute role="admin"><AdminDeviceManagementScreen /></ProtectedRoute>} />
<Route path="/admin/storage" element={<ProtectedRoute role="admin"><AdminStorageScreen /></ProtectedRoute>} />
              <Route path="/admin/dmr-settings" element={<ReportAdminProtectedRoute><AdminDmrSettingsScreen /></ReportAdminProtectedRoute>} />
              <Route path="/admin/dmr-dashboard" element={<ReportAdminProtectedRoute><AdminDmrDashboardScreen /></ReportAdminProtectedRoute>} />
              <Route path="/staff/dmr-fill" element={<DmrFillScreen />} />
</Routes>
          </MaintenanceWrapper>
        </Suspense>
        <WhatsAppButton />
      </div>
      </SessionManager>
    </BrowserRouter></ErrorBoundary>
  );
}
