'use client';
// import AuthButton from '@/components/UI/AuthButton/AuthButton';

import { Box, Container, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';



const Navber = () => {
  const AuthButton = dynamic(() => import('@/components/UI/AuthButton/AuthButton'), { ssr: false })


  return (
    <Container>
      <Stack py={2} direction="row" justifyContent="space-between">
        <Typography component={Link} href="/" variant="h4" fontWeight={600}>
          P{' '}
          <Box component="span" color="primary.main">
            H
          </Box>{' '}
          Health Carre
        </Typography>

        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography>Helth Plan</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>NGOs</Typography>
        </Stack>

        <AuthButton />
      </Stack>
    </Container>
  );
};

export default Navber;
