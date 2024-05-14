'use client';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import SpecialtyModal from './components/SpecialistModal';
import {
  useDeleteSpecialtiesMutation,
  useGateAllSpecialtiesQuery,
} from '@/redux/api/specialtiesApi';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import Image from 'next/image';
import { toast } from 'sonner';

const Specialties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSpecialties] = useDeleteSpecialtiesMutation();
  const { data, isLoading } = useGateAllSpecialtiesQuery({});

  const handleSubmit = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteSpecialties(id).unwrap();
      if (res?.id) {
        toast.success('Specialties Deleted Successfully !');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', width: 700 },
    {
      field: 'icon',
      headerName: 'Icon',
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box mt={0.7}>
            <Image src={row.icon} alt="Icon" width={30} height={30} />
          </Box>
        );
      },
    },
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
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button onClick={() => setIsModalOpen(true)}>Create Specialties</Button>
        <TextField placeholder="Search Specialties" />
        <SpecialtyModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
      {!isLoading ? (
        <Box mt={2}>
          <DataGrid rows={data} columns={columns} />
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

export default Specialties;
