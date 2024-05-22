export interface IDoctor {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  doctorSpecialties?: string[];
}
