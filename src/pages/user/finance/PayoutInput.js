// @mui
import { useState, useEffect,React,useMemo } from 'react';

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack,TextField,Alert } from '@mui/material';
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

export default function PaymentSummary() {
  const { enqueueSnackbar } = useSnackbar();

  const forminput = Yup.object().shape({
    number: Yup.string().required('Enter ID Numner'),
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

  useEffect(() => {
       reset(defaultValues);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/user/payoutprocess', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        amount: formState.amount,
        trxpin: formState.trxpin
       })
      .then(res => { 
         // Notification Starts;
         if(res.data.code === 200)
         { 
           enqueueSnackbar(res.data.message, {variant:'success'});
           window.location.reload(false);
           }
           enqueueSnackbar(res.data.message, {variant:'error'}); 
           if(res.data.error.length > 0){
             for (let i = 0; i < res.data.error.length; i+=1) {
               enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
               }
           }
         // Notification Ends;
       
      })
      reset();
     } catch (error) {
      console.error(error);
    }
  };

   
   const {general,user} = useAuth();
   const bank = JSON.parse(user.bank_details);  
   const bankv = Object.entries(bank);
   
  return (
    <Page>
    <RootStyle>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Request Payout
          </Typography>
        </Stack>
        <Stack spacing={3} mt={5}>
        <TextField type="number" name="amount" id="amount" fullWidth label="Amount" />
          </Stack>
        <Stack spacing={3} mt={5}>
        <TextField type="text" name="trxpin" id="trxpin" fullWidth label="Transaction Pin" />
          </Stack>
         
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
       <a id="description" className="text-primary">{null}</a>
      </Typography> 


        
            
     
        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
        {!!user.bank_details.code && <Alert severity="error">You have not setup you payout bank account details yet</Alert>}
      </Stack>
      <Stack spacing={2}>
        {bankv.map((row,index) => (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {(/^./, row[0].toUpperCase())}
            </Typography>
            <Typography variant="subtitle2">{row[1] || ''}</Typography>
          </Stack>
           ))}
         
        </Stack>

     
 
      <LoadingButton disabled={!!user.bank_details.code} type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Request Payout'}
      </LoadingButton> 
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
