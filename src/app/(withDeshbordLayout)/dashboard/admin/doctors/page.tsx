'use client';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import DoctorModal from './components/DoctorModal';
import {
  useDeleteDoctorMutation,
  useGetAllDoctorQuery,
} from '@/redux/api/doctorApi';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { toast } from 'sonner';
import { useDebounced } from '@/redux/hooks';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';

const AdminDoctorpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const query: Record<string, any> = {};

  //debaounce hoock called delay searchTearm Call function

  const debaounceData = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debaounceData) {
    query['searchTerm'] = searchTerm;
  }

  const { data, isLoading } = useGetAllDoctorQuery({ ...query });
  const [deleteDoctor] = useDeleteDoctorMutation();
  const doctorData = data?.doctors;
  const meta = data?.meta;

  const handleSubmit = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteDoctor(id).unwrap();
      if (res?.id) {
        toast.success('Specialties Deleted Successfully !');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
    { field: 'appointmentFee', headerName: 'AppointmentFee', flex: 1 },
    { field: 'qualification', headerName: 'Qualification', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box mt={0.7}>
            <IconButton
              onClick={() => handleSubmit(row.id)}
              aria-label="delete"
            >
              <GridDeleteIcon />
            </IconButton>

            <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Doctors"
        />
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
      {!isLoading ? (
        <Box mt={2}>
          <DataGrid rows={doctorData} columns={columns} />
        </Box>
      ) : (
        //Loading Component
        <CircularProgress
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0px auto',
          }}
          color="secondary"
        />
      )}
    </Box>
  );
};

export default AdminDoctorpage;
