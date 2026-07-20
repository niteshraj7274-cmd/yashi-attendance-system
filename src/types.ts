export type Role = 'admin' | 'centre' | 'staff';

export interface User {
  uid: string;
  role: Role;
  name?: string;
  email?: string;
}

export interface SupportInfo {
  workingHours?: string;
  whatsapp: string;
  call: string;
  email: string;
}

export interface AdminProfile {
  name: string;
  mobile: string;
  email: string;
  designation: string;
  profilePhoto?: string;
  digitalSignature?: string;
}

export interface Center {
  id?: string;
  name: string;
  code: string;
  email: string;
  mobile: string;
  district: string;
  block: string;
  address: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  geofenceRadius?: number;
  mapsLink: string;
  status: 'Active' | 'Inactive';
  isDeleted: boolean;
  
  // Salary Details
  basicSalary?: number;
  netSalary?: number;
  pf?: number;
  esi?: number;
  hra?: number;
  otherAllowance?: number;
  grossSalary?: number;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  paymentMode?: string;

  // Salary Settings
  salaryProcessingEnabled?: boolean;
  lateDeductionEnabled?: boolean;
  pin?: string;
  createdAt?: any;
}

export interface Staff {
  id?: string;
  staffId: string;
  name: string;
  fatherName: string;
  dob?: string;
  gender?: string;
  qualification?: string;
  experience?: string;
  address?: string;
  status?: string;
  designation: string;
  mobile: string;
  email: string;
  joiningDate: string;
  centerId: string;
  centerCode?: string;
  centerName?: string;
  photoUrl?: string;
  isDeleted: boolean;
  pin?: string;
  createdAt?: any;
  basicSalary?: number;
  monthlyIncentive?: number;
  otherAllowance?: number;
  totalMonthlySalary?: number;
  salaryEffectiveFrom?: string;
  salaryStatus?: 'Active' | 'Hold' | 'Inactive';
  salaryHistory?: {
    date: string;
    basic: number;
    incentive: number;
    otherAllowance: number;
    total: number;
    status: string;
    effectiveFrom: string;
  }[];
}
