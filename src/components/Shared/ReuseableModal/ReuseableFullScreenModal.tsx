import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import {
  Box,
  DialogContent,
  DialogTitle,
  SxProps,
  Typography,
} from '@mui/material';
import { BootstrapDialog } from './ReuseableModal';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
};

export default function ReuseableFullScreenModal({
  open,
  setOpen,
  title,
  children,
  sx,
}: TProps) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{ background: '#fafafa', boxShadow: 0 }}
      >
        <AppBar
          sx={{
            position: 'relative',
            left: '96%',
            background: '#fafafa',
            boxShadow: 0,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="secondary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent dividers>
          <Box>
            <Typography component='h4' variant='h5' my={1}>{title}</Typography>
          </Box>
          {children}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
