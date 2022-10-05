// @mui
import { useState, useEffect,React,useMemo } from 'react';

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

export default function RequestPaymentInput() {
  const { enqueueSnackbar } = useSnackbar(); 
   const methods = useForm({
   });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  
  
  const onSubmit = async (event, formState) => {
    try { 
       await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/user/request/payment', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        amount: formState.amount,
        email: formState.email,
        description: formState.description,
       })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
        }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }
       
      })
     } catch (error) {
      console.error(error);
    }
  };
  const {general} = useAuth();
  
  const gettotal = () => {
    try {
      
     const amount = document.getElementById('amount').value;
     const fee = general.pr_fee/100*amount;
     document.getElementById("fee").innerHTML = fee;
     document.getElementById("total").innerHTML = amount-fee;
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
            Request Fund
          </Typography>
        </Stack>
        <Stack spacing={3} mt={5}>
        <TextField type="number" name="amount" id="amount"  onKeyUp={gettotal} fullWidth label="Amount" />
          </Stack> 

        <Stack spacing={3} mt={5}>
        <TextField type="text" name="email" id="email" fullWidth label="Payer's Email Address" />
          </Stack>

        <Stack spacing={3} mt={5}>
        <TextField type="text" name="description" id="description" fullWidth label="Payment Description" />
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />
         <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
          <small>  Fee ({general.pr_fee}%)</small>
          </Typography>
          <Typography variant="h6" component="p">
          <small>{general.cur_sym}<a id="fee">0.00</a></small>
          </Typography>
        </Stack> 
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            You Receive
          </Typography>
          <Typography variant="h6" component="p">
          {general.cur_sym}<a id="total">0.00</a>
          </Typography>
        </Stack> 
        
 
        <Divider sx={{ borderStyle: 'dashed' }} />
 
      
      </Stack>

      <Stack alignItems="center" spacing={1}>
         
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          By clicking on the Request Button below, <br/>an email will be sent to the recipient inviting him or her to make payment for the requested amount
        </Typography>
      </Stack>
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Request Fund'}
      </LoadingButton>
 
     
      
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
