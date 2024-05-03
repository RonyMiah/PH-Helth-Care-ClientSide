import { Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import facebookIcon from '@/assets/landing_page/facebook.png';
import instragramIcon from '@/assets/landing_page/instagram.png';
import twiterIcon from '@/assets/landing_page/twitter.png';
import linkdinIcon from '@/assets/landing_page/linkedin.png';
const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26 , 34)" py={5}>
      <Container>
        <Stack direction="row" justifyContent="center" gap={4}>
          <Typography color="white" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="white">Helth Plan</Typography>
          <Typography color="white">Medicine</Typography>
          <Typography color="white">Diagnostics</Typography>
          <Typography color="white">NGOs</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" py={3} gap={2}>
          <Link href="https://www.facebook.com/khairojJaman">
            {' '}
            <Image width={30} height={30} src={facebookIcon} alt="facebook" />
          </Link>
          <Image width={30} height={30} src={instragramIcon} alt="facebook" />
          <Image width={30} height={30} src={twiterIcon} alt="facebook" />
          <Image width={30} height={30} src={linkdinIcon} alt="facebook" />
        </Stack>
        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={3}
          gap={2}
        >
          <Typography component="p" color="white">
            &copy; 2024 Ph HealthCare, All Rights Reserved.
          </Typography>
          <Typography
            color="white"
            component={Link}
            href="/"
            variant="h4"
            fontWeight={600}
          >
            P{' '}
            <Box component="span" color="primary.main">
              H
            </Box>{' '}
            Health Carre
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy ! Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
