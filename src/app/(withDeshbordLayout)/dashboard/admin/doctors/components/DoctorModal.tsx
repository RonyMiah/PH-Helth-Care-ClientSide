import PHForm from '@/components/Froms/PHForms';
import PHInput from '@/components/Froms/PHInput';
import PHSelect from '@/components/Froms/PHSelect';
import ReuseableFullScreenModal from '@/components/Shared/ReuseableModal/ReuseableFullScreenModal';
import { useCreateDoctorMutation } from '@/redux/api/doctorApi';
import { TGender } from '@/types';
import { modifyPayload } from '@/utils/modifyPayload';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid } from '@mui/material';
import { Metadata } from 'next';
import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Admin Deshboard Page',
  description: 'This is Admin Deshbord Pages',
};

//Zod Validation
export const CreateDoctorvalidationSchema = z.object({
  doctor: z.object({
    name: z.string().min(1, 'Please Enter Your Name'),
    email: z
      .string()
      .email({ message: 'Please Enter Your Valida Email Address'! }),
    contactNumber: z
      .string()
      .regex(/^(01[3-9]\d{8})$/, 'Please Provide a valid phone number '),
    address: z.string().min(1, 'Please Enter Your Name'),
    registrationNumber: z.string().min(1, 'registrationNumber is Required !'),
    experience: z.string().min(1, 'Experience is required !'),
    gender: z.enum(['FEMALE', 'MALE']),
    appointmentFee: z.string().min(1, 'AppointmentFee is required !'),
    qualification: z.string().min(1, 'Qualification is required !'),
    currentWorkingPlace: z
      .string()
      .min(1, 'Current Working Place is required !'),

    designation: z.string().min(1, 'Designation is required !'),
  }),
  password: z.string().min(6, ' Must be at least 6 characters '),
});

type Tprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: Tprops) => {
  const [createDoctor] = useCreateDoctorMutation();

  //handle Submit
  const handleOnSubmit = async (values: FieldValues) => {
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);

    // console.log(values)

    const data = modifyPayload(values);

    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      setOpen(false);
      if (res?.id) {
        toast.success('Doctor Created Successfully ');
      }
    } catch (error: any) {
      // toast.warning(error.message);
      console.log(error);
    }
  };

  const defaultValues = {
    password: '',
    doctor: {
      name: '',
      email: '',
      contactNumber: '',
      address: '',
      registrationNumber: '',
      experience: 0,
      gender: '',
      appointmentFee: 0,
      qualification: '',
      currentWorkingPlace: '',
      designation: '',
    },
  };

  return (
    <ReuseableFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create new Doctor "
    >
      <PHForm
        onSubmit={handleOnSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(CreateDoctorvalidationSchema)}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.name"
              label="Name"
              placeholder="Name"
              type="text"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.email"
              label="Email"
              placeholder="Email"
              type="email"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.contactNumber"
              label="Contact Number "
              placeholder="Contact Number"
              type="tel"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.address"
              label="Address"
              placeholder="Address"
              type="text"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.registrationNumber"
              label="Registration Number"
              placeholder="Registration"
              type="text"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.experience"
              label="Exprience"
              placeholder="0"
              type="number"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHSelect
              items={TGender}
              name="doctor.gender"
              fullWidth={true}
              placeholder="Gender"
              label="Gender"
            ></PHSelect>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.appointmentFee"
              label="Appointment Fee"
              placeholder="0"
              type="number"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.qualification"
              label="Qualification"
              placeholder="Qualification"
              type="text"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              placeholder="Current Working Place"
              type="text"
              fullWidth={true}
            ></PHInput>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PHInput
              name="doctor.designation"
              label="Designation"
              placeholder="Designation"
              type="text"
              fullWidth={true}
              sx={{ mb: 2 }}
            ></PHInput>
          </Grid>
          <Button type="submit" sx={{ display: 'block', ml: 'auto' }}>
            Create
          </Button>
        </Grid>
      </PHForm>
    </ReuseableFullScreenModal>
  );
};

export default DoctorModal;
