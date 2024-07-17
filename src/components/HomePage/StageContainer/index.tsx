"use client";
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PersonalForm from './components/PersonalForm';
import TravelPreferencesForm from './components/TravelPreferencesForm';
import HealthSafetyForm from './components/HealthSafetyForm';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createUser } from '@/actions/createUser';


const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const steps = ['Personal Information', 'Travel Preferences', 'Health and Safety'];

const validationSchema = [
  z.object({
    fullName: z.string({required_error:"Required Field!"}).min(1, "Required Field!"),
    dob: z
    .string({required_error:"Date must be in the format DD/MM/YYYY"})
    .refine((date) => dayjs(date, "DD/MM/YYYY", true).isValid(), {
      message: "Date must be in the format DD/MM/YYYY",
    }),
    nationality: z.string({required_error:"Required Field!"}).min(1, "Required Field!"),
    contactInformation: z
    .string({required_error:"Must be a valid phone number or email"})
    .refine((value) => phoneRegex.test(value) || emailRegex.test(value), {
      message: "Must be a valid phone number or email",
    }),
  }),
  z.object({
    
    departureDate: z
    .string({required_error:"Date must be in the format DD/MM/YYYY"})
    .refine((date) => dayjs(date, "DD/MM/YYYY", true).isValid(), {
      message: "Date must be in the format DD/MM/YYYY",
    }),
    returnDate: z
    .string({required_error:"Date must be in the format DD/MM/YYYY"})
    .refine((date) => dayjs(date, "DD/MM/YYYY", true).isValid(), {
      message: "Date must be in the format DD/MM/YYYY",
    }),
    accommodationPreference:z.string({required_error:"Required Field!"}).min(1, "Required Field!"),
    specialPreference:z.string({required_error:"Required Field!"}).min(1, "Required Field!"),
  }),
  z.object({
    healthDeclaration:z.string({required_error:"Required Field!"}).min(1, "Required Field!"),
    emergencyContactInfo:z.string({required_error:"Required Field!"}).min(1, "Required Field!"),
    
  })
];

export default function StagContainer() {
  const router = useRouter()
  const [submitted,setSubmitted]= useState(false)
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const methods = useForm({
    resolver: zodResolver(validationSchema[activeStep])
  });

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = async () => {
    const isValid = await methods.trigger();
    
    if(!isValid){
        toast.error("Please fill up all fields")
        return
    }

  
    setCompleted((prevCompleted) => ({
      ...prevCompleted,
      [activeStep]: true
    }));

    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;

      
      setActiveStep(newActiveStep);
  

      // Create User
      if(allStepsCompleted()){
        const res = await createUser(methods.getValues())
        console.log(res)
        toast.error("Request Submitted SuccessFully!")
        console.log(methods.getValues())
        setSubmitted(true)
        // router.push("/success")
      }
      
    };

    console.log(completed)

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    methods.reset();
    setSubmitted(false)
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%' }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {
            <React.Fragment>
              <Box p={10}>

              {
                !submitted ? 
                  <>
                    {activeStep === 0 && <PersonalForm />}
                    {activeStep === 1 && <TravelPreferencesForm />}
                    {activeStep === 2 && <HealthSafetyForm />}
                  </>
                :
                <>
                <Typography variant='h1' fontSize={120} textAlign={"center"}>All Done!</Typography>
                <Button
                 onClick={handleReset}
                 sx={{ mr: 1 }}
                 variant='outlined'
               >
                 Back
               </Button>
                </>
              }
             
              </Box>

              {
                !submitted &&   <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                 
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant='outlined'
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}  variant="contained" >
                  {isLastStep() ? 'Submit' : 'Next'}
                </Button>
              </Box>
              }
             
            </React.Fragment>
          }
        </div>
      </Box>
    </FormProvider>
  );
}
