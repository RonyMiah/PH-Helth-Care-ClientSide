import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const Navber = () => {
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
        <Button component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navber;
