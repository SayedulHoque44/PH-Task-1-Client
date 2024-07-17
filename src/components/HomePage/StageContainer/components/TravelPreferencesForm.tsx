/* eslint-disable no-unused-vars */

import CustomInput from '@/components/Form/CustomInput';

import { Box, Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const TravelPreferencesForm = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
      <Box>
      <Grid container spacing={2} my={1}>
      <Grid item md={6} width={"100%"}>
        <CustomInput
          name="departureDate"
          label="DepartureDate"
          placeholder='DD/MM/YYYY'
          type="text"
          fullWidth={true}
        />
      </Grid>
      <Grid item md={6} width={"100%"}>
        <CustomInput
          name="returnDate"
          label="ReturnDate"
          placeholder='DD/MM/YYYY'
          type="text"
          fullWidth={true}
        />
      </Grid>
      <Grid item md={6} width={"100%"}>
        <CustomInput
          name="accommodationPreference"
          label="Accommodation Preference"
          type="text"
          fullWidth={true}
        />
      </Grid>
      <Grid item md={6} width={"100%"}>
        <CustomInput
          name="specialPreference"
          label="Special Preference"
          type="text"
          fullWidth={true}
        />
      </Grid>
      </Grid>
  </Box>
    );
};

export default TravelPreferencesForm;