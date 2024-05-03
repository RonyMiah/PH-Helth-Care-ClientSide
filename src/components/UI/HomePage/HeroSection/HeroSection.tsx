import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import assets from '@/assets';

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        direction: 'row',
        my: 16,
      }}
    >
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '700px',
            // border: '1px solid red',
            top: '-90px',
            left: '-120px',
          }}
        >
          <Image src={assets.svgs.grid} alt="grid" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Healthier Hearts
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Comes From
        </Typography>
        <Typography
          color="primary.main"
          variant="h3"
          component="h1"
          fontWeight={600}
        >
          Preventive Care
        </Typography>
        <Typography
          sx={{
            my: 4,
          }}
          variant="h6"
          component="p"
          fontWeight={400}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel id at,
          porro veritatis quibusdam dicta perferendis ipsam tempora soluta
          dolorem praesentium quisquam .
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Button>Make Appoinment</Button>
          <Button variant="outlined">Contact Us</Button>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          mt: 0,
        }}
      >
        {/* Arrow Sign  */}
        <Box
          sx={{
            position: 'absolute',
            left: '320px',
            top: '-50px',
          }}
        >
          <Image src={assets.svgs.arrow} alt="arrow" width={100} height={100} />
        </Box>
        {/* Image For Flex  */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <Box>
            <Image
              src={assets.images.doctor1}
              width={240}
              height={380}
              alt="image1"
            />
          </Box>
          <Box>
            <Image
              width={240}
              height={380}
              src={assets.images.doctor2}
              alt="image2"
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '190px',
            left: '230px',
          }}
        >
          <Image
            width={240}
            height={240}
            src={assets.images.doctor3}
            alt="doctor3"
          />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '-90px',
            right: 110,
            zIndex: "-1"
          }}
        >
          <Image 
            width={180}
            height={180}
            src={assets.images.stethoscope}
            alt="stethoscope"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
