import PHForm from '@/components/Froms/PHForms';
import ReuseableModal from '@/components/Shared/ReuseableModal/ReuseableModal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { FieldValues } from 'react-hook-form';
import dayjs from 'dayjs';
import { Button, Grid } from '@mui/material';
import PHDatePicker from '@/components/Froms/PHDatePicker';
import PHTimePicker from '@/components/Froms/PHTimePicker';
import { dateFormater } from '@/utils/dateFormater';
import { timeFormater } from '@/utils/timeFormater';
import { useCreateScheduleMutation } from '@/redux/api/scheduleApi';
import { toast } from 'sonner';

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({ open, setOpen }: TProps) => {
  const [createSchedule] = useCreateScheduleMutation();

  const handleSubmit = async (values: FieldValues) => {
    values.startDate = dateFormater(values.startDate);
    values.endDate = dateFormater(values.endDate);
    values.startTime = timeFormater(values.startTime);
    values.endTime = timeFormater(values.endTime);

    try {
      const res: any = await createSchedule(values);
     //   console.log(res);
      if (res?.data?.length) {
        toast.success('Schedule Created Successfully !');
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
    console.log(values);
  };
  return (
    <ReuseableModal open={open} setOpen={setOpen} title="Create Schedule">
      <PHForm onSubmit={handleSubmit}>
        <Grid container spacing={2} width="400px">
          <Grid item md={12}>
            <PHDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <PHDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <PHTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 2 }}>
          Create
        </Button>
      </PHForm>
    </ReuseableModal>
  );
};

export default ScheduleModal;
