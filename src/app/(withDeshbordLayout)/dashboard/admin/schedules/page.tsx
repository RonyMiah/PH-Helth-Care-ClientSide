'use client';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import ScheduleModal from './components/ScheduleModal';
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from '@/redux/api/scheduleApi';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import { dateFormater } from '@/utils/dateFormater';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'sonner';

const AdminSchedules = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [schedules, setSchedule] = useState<any>([]);
  const { data, isLoading } = useGetAllSchedulesQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();
  const scheduleData = data?.data;
  // console.log(scheduleData);
  const meta = data?.meta;

  useEffect(() => {
    const updatadData = scheduleData?.map((schedule: any, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.id,
        startDate: dateFormater(schedule.startDateTime),
        endDate: dateFormater(schedule.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format('hh:mm a'),
        endTime: dayjs(schedule?.endDateTime).format('hh:mm a'),
      };
    });
    setSchedule(updatadData);
  }, [scheduleData]);

  const handleSubmit = async (id: string) => {
    console.log(id);
    try {
      const res = await deleteSchedule(id).unwrap();
      if (res?.id) {
        toast.success('Schedule Deleted Successfully !');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End  Date', flex: 1 },
    { field: 'startTime', headerName: 'start  Time', flex: 1 },
    { field: 'endTime', headerName: 'End  Time', flex: 1 },
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
              sx={{ color: 'red' }}
              onClick={() => handleSubmit(row.id)}
              aria-label="delete"
            >
              <GridDeleteIcon />
            </IconButton>
            <EditIcon />
          </Box>
        );
      },
    },
  ];
  return (
    <Box>
      <Button onClick={() => setIsOpen(true)}>Create Schedules</Button>
      <ScheduleModal open={isOpen} setOpen={setIsOpen} />
      {!isLoading ? (
        <Box mt={2}>
          <DataGrid rows={schedules ?? []} columns={columns} />
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

export default AdminSchedules;
