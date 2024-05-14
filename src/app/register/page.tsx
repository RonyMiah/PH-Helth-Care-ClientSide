'use client';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import { modifyPayload } from '@/utils/modifyPayload';
import { registerPatient } from '@/services/actions/registerPatient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';
import PHForm from '@/components/Froms/PHForms';
import PHInput from '@/components/Froms/PHInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export const patientValidationSchema = z.object({
  password: z.string().min(6, 'Password Mininum 6 Caracter'),
  patient: z.object({
    email: z.string().email('Email is required !'),
    name: z.string().min(1, 'Name is required'),
    contactNumber: z
      .string()
      .regex(/^(01[3-9]\d{8})$/, 'Please Provide a valid phone number '),
    address: z.string().min(1, 'Address is required !'),
  }),
});

export const defatultvalues = {
  password: '',
  patient: {
    name: '',
    email: '',
    contactNumber: '',
    address: '',
  },
};

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const registerHandleSubmit: SubmitHandler<FieldValues> = async (values) => {
    const data = modifyPayload(values);
    // console.log(values);

    try {
      const res = await registerPatient(data);
      // console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          toast.success(result?.message);
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push('/dashboard');
        }
      } else {
        setError((res.message = 'This User is Already Exists'));
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: 'center',
          }}
        >
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" component="h1" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
          {/* For Error Message show in Server  */}
          <Box>
            {error && (
              <Box>
                <Typography sx={{ color: 'red', textAlign: 'center' }}>
                  {error}
                </Typography>
              </Box>
            )}
          </Box>

          <Box>
            <PHForm
              onSubmit={registerHandleSubmit}
              resolver={zodResolver(patientValidationSchema)}
              defaultValues={defatultvalues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput
                    name="patient.name"
                    fullWidth={true}
                    label="Name"
                    type="text"
                    size="small"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.email"
                    fullWidth={true}
                    label="Email"
                    type="email"
                    size="small"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="password"
                    fullWidth={true}
                    label="Password"
                    type="password"
                    size="small"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.contactNumber"
                    fullWidth={true}
                    label="Contact Number"
                    type="tel"
                    size="small"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    name="patient.address"
                    fullWidth={true}
                    label="Address"
                    type="text"
                    size="small"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: '10px 0px',
                }}
                type="submit"
                fullWidth={true}
              >
                Register
              </Button>
              <Typography component="h6" fontWeight={300}>
                Do you already have an account ?{' '}
                <Link className="text-blue-500" href="/login">
                  Login Here
                </Link>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
