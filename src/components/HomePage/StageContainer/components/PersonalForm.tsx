
import CustomInput from '@/components/Form/CustomInput';
import {  Box, Grid } from '@mui/material';
import React from 'react';

const PersonalForm = () => {
    return (
        <Box>
              <Grid container spacing={2} my={1}>
                <Grid item md={6} width={"100%"}>
                  <CustomInput
                    name="fullName"
                    label="Full Name"
                    type="text"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} width={"100%"}>
                  {/* <CustomDatePicker name='DoB'  /> */}
                  <CustomInput
                    name="dob"
                    label="Date of birth"
                    placeholder='DD/MM/YYYY'
                    type="text"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} width={"100%"}>
                  <CustomInput
                    name="nationality"
                    label="Nationality"
                    type="text"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} width={"100%"}>
                  <CustomInput
                    name="contactInformation"
                    label="Contact Informaiton"
                    type="text"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
        </Box>
    );
};

export default PersonalForm;