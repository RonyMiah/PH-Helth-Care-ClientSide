import PHFileUploader from '@/components/Froms/PHFileUploader';
import PHForm from '@/components/Froms/PHForms';
import PHInput from '@/components/Froms/PHInput';
import ReuseableModal from '@/components/Shared/ReuseableModal/ReuseableModal';
import { useCreateSpecialtiesMutation } from '@/redux/api/specialtiesApi';
import { modifyPayload } from '@/utils/modifyPayload';
import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

type Tprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtyModal = ({ open, setOpen }: Tprops) => {
  const [createSpecialties] = useCreateSpecialtiesMutation();

  const handaleSubmit = async (values: FieldValues) => {
    // console.log(values);
    const data = modifyPayload(values);
    try {
      const res = await createSpecialties(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success('Specialties Created Successfully !');
        setOpen(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <ReuseableModal open={open} setOpen={setOpen} title="Create SpecialTies">
      <PHForm onSubmit={handaleSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <PHInput name="title" label="Title" />
          </Grid>
          <Grid item md={6}>
            <PHFileUploader name="file" label="Upload File" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Create
        </Button>
      </PHForm>
    </ReuseableModal>
  );
};

export default SpecialtyModal;
