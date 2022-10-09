// @mui
import { useState, useEffect, useRef,React, useMemo } from 'react';
import { useNavigate} from "react-router-dom";

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, Stack,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';

import {
  FormProvider,
   RHFSelect,
   RHFTextField,
  } from '../../../components/hook-form';
  import axios from '../../../utils/axios';

  import { fCurrency } from '../../../utils/formatNumber';
  import useAuth from '../../../hooks/useAuth';
  import Page from '../../../components/Page';

  // ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));




 

// ----------------------------------------------------------------------

export default function PaymentSummary() {
   const { enqueueSnackbar } = useSnackbar();

  const forminput = Yup.object().shape({
    amount: Yup.string().required('Enter ID Numner'),
    expiry: Yup.string().required('ID expiry date is required'),
    issued_date: Yup.string().required('ID issued date is required'),
    type: Yup.string().required('Please select ID type'),
    image: Yup.array().min(1, 'Image is required'),
   });

  const defaultValues = useMemo(
    () => ({
      name:  '',
    }),
    
   );

  const methods = useForm({
     defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
 
  const navigate = useNavigate();
  
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/user/ecard/insert', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        amount: formState.amount,
        cardpin: formState.cardpin,
        trxpin: formState.trxpin, 
       })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          navigate(`${res.data.data.ref}`, { replace: true });
          console.log(res.data.data.ref);
          }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }
       
      })
      reset();
     } catch (error) {
      console.error(error);
    }
  };
 

  const getamount = (event, min) => {
    try {
     const amount = event.target.value;
      document.getElementById("total").innerHTML = amount;
    } catch (error) {
      console.error(error);
    }
  }; 
  
  return (
    <Page>
    <RootStyle>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Create New E-Card
          </Typography>
        </Stack>
        <Stack spacing={3} mt={5}>
         <TextField type="number" name="amount" id="amount" onKeyUp={getamount} fullWidth label="Enter amount to load on e-card" />
        </Stack>
        <Stack spacing={3} mt={5}>
        <TextField type="password" name="cardpin" id="cardpin" fullWidth label="Enter Pin" />
        </Stack>


        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" component="p" sx={{ color: 'red' }}>
          <b>Note:</b> this is not your transaction pin. This is a pin to secure the e-card from being used by an unauthorized person.
          This pin will be requested whenever the e-card is utilized.
          </Typography> 
          
        </Stack>
         
        
        

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack spacing={3} mt={5}>
        <TextField type="password" name="trxpin" id="trxpin" fullWidth label="Enter Transaction Pin" />
        </Stack>

        
        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Create E-card'}
      </LoadingButton> 
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
