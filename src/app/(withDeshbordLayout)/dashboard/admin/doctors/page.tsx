'use client';
import { Box, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import DoctorModal from './components/DoctorModal';

const AdminDoctorpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button onClick={() => setIsModalOpen(true)}>Create Specialties</Button>
        <TextField placeholder="Search Specialties" />
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
    </Box>
  );
};

export default AdminDoctorpage;
