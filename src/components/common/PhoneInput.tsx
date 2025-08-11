import React from "react";
import { Controller, type Control } from "react-hook-form";
import type { Country } from "../../types";
import { MenuItem, FormControl, Select, TextField } from '@mui/material';

interface PhoneInputProps {
  control: Control<any>;
  countries: Country[];
  loading: boolean;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  control,
  countries = [],
  loading,
  disabled = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      <Controller
        name="countryCode"
        control={control}
        render={({ field }) => (
          <FormControl 
            variant="outlined" 
            size="small" 
            sx={{
              minWidth: 110,
              borderRadius: 2,
              bgcolor: 'background.paper', 
            }}
            disabled={disabled || loading}
          >
            <Select
              {...field}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                  }
                }
              }}
            >
              {countries.map((country) => {
                const code = country.idd.root + (country.idd.suffixes?.[0] ?? "");
                return (
                  <MenuItem key={country.cca2} value={code}>
                    {code}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="tel"
            variant="outlined"
            size="small"
            disabled={disabled}
            placeholder="1234567890"
            fullWidth
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              '& input': {
                fontWeight: 500,
                color: 'text.primary',
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default PhoneInput;
