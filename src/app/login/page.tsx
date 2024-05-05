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
import assets from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { userLogin } from '@/services/actions/userLogin';
import { storeUserInfo } from '@/services/auth.services';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    // console.log(data);
    try {
      const res = await userLogin(data);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
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
                LonIn PH HelthCare
              </Typography>
            </Box>
          </Stack>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <TextField
                    fullWidth={true}
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    {...register('email')}
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
              </Grid>
              <Typography
                sx={{
                  marginBottom: '10px',
                }}
                textAlign="end"
                component="p"
                fontWeight={300}
              >
                <Link href="/">
                  <span className="text-blue-500"> Forget Password ?</span>
                </Link>
              </Typography>
              <Button
                sx={{
                  margin: '10px 0px',
                }}
                type="submit"
                fullWidth={true}
              >
                LogIn
              </Button>
              <Typography component="h6" fontWeight={300}>
                Don&apos;t have an account ?
                <Link className="text-blue-500" href="/register">
                  <span> Create Account</span>
                </Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
