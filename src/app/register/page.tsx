'use client';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { modifyPayload } from '@/utils/modifyPayload';
import { registerPatient } from '@/services/actions/registerPatient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';

interface PatientRetisterData {
  password: string;
  patient: {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
  };
}

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientRetisterData>();

  const onSubmit: SubmitHandler<PatientRetisterData> = async (values) => {
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
          router.push('/');
        }
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

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <TextField
                    fullWidth={true}
                    label="Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    {...register('patient.name')}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth={true}
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    {...register('patient.email')}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth={true}
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    {...register('password')}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth={true}
                    label="Contact Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    {...register('patient.contactNumber')}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    fullWidth={true}
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    {...register('patient.address')}
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
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
