import ReuseableFullScreenModal from '@/components/Shared/ReuseableModal/ReuseableFullScreenModal';
import React from 'react';

type Tprops = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: Tprops) => {
  return (
    <ReuseableFullScreenModal
      open={open}
      setOpen={setOpen}
      title="Create new Doctor "
    >

        <h1>Hello World</h1>
    </ReuseableFullScreenModal>
  );
};

export default DoctorModal;
