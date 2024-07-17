/* eslint-disable no-unused-vars */

import CustomInput from '@/components/Form/CustomInput';
import CustomSelectField from '@/components/Form/CustomSelectField';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const HealthSafetyForm = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
      <Box>
      <Grid container spacing={2} my={1}>
        <Grid item md={6} width={"100%"}>
          <CustomSelectField
            name="healthDeclaration"
            label="health Declaration"
            placeholder='health Declaration'
            items={["Yes","No"]}
            fullWidth={true}
          />
        </Grid>
        <Grid item md={6} width={"100%"}>
          <CustomInput
            name="emergencyContactInfo"
            label="Emergency ContactInfo"
            type="text"
            fullWidth={true}
          />
        </Grid>
      </Grid>
    </Box>
    );
};

export default HealthSafetyForm;