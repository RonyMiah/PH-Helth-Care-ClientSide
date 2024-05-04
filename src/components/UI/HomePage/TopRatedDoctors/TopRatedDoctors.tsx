import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const TopRatedDoctors = async () => {
  const res = await fetch(
    'http://localhost:8000/api/v1/doctor/?limit=3&page=1'
  );
  const { data: doctorInfo } = await res.json();

  console.log(doctorInfo);
  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: 'rgba(20, 20, 20, 0.1)',
        clipPath: 'polygon(0 0, 100% 25%, 100% 100% , 0 75%)',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Top Rated Doctors
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18}>
          Access To expart physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18}>
          and top-quality surgery facilities right here.
        </Typography>
      </Box>

      <Container
        sx={{
          margin: '30px auto',
        }}
      >
        <Grid container spacing={2}>
          {doctorInfo.map((doctor: any) => (
            <Grid item key={doctor?.id} md={4}>
              <Card>
                <Box>
                  <Image
                    src={doctor?.profilePhoto}
                    alt="doctorImage"
                    width={500}
                    height={500}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.designation},{doctor.qualification}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <LocationOnIcon /> {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 8,
                    paddingBottom: '20px',
                  }}
                >
                  <Button>Book Now </Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Button
            sx={{
              mt: '20px',
            }}
            variant="outlined"
          >
            {' '}
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
