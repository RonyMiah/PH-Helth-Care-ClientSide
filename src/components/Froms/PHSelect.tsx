import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem, SxProps, TextField } from '@mui/material';

type TInputProps = {
  name: string;
  fullWidth?: boolean;
  label?: string;
  sx?: SxProps;
  size?: 'small' | 'medium';
  placeholder?: string;
  required?: boolean;
  items: string[];
};

const PHSelect = ({
  name,
  items,
  fullWidth,
  placeholder,
  label,
  size = 'small',
  sx,
  required,
}: TInputProps) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          placeholder={placeholder}
          fullWidth={fullWidth}
          label={label}
          size={size}
          select
          required={required}
          sx={{ ...sx }}
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ''
          }
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default PHSelect;
