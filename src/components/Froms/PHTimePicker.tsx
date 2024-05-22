import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IDatePicker {
  name: string;
  size?: 'small' | 'medium';
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const PHTimePicker = ({
  name,
  size = 'small',
  label,
  required,
  fullWidth = true,
  sx,
}: IDatePicker) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dayjs(new Date().toDateString())}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              {...field}
              value={value || Date.now()}
              label={label}
              timezone="system"
              onChange={(time) => onChange(time)}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  fullWidth: fullWidth,
                  error: isError,
                  helperText: isError
                    ? (formState.errors[name]?.message as string)
                    : '',
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default PHTimePicker;
