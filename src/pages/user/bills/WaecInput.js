// @mui
import { useState, useEffect, React } from 'react';
import * as Yup from 'yup';
 import { styled, alpha } from '@mui/material/styles';

import { Divider, Typography, Stack,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import {
  SkeletonProductItem,
  SkeletonInputLoader,
} from '../../../components/skeleton';

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

export default function AirtimeInput() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
  });

  const defaultValues = {
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phone: user?.phone || '',
    country: user?.address.country || '',
    address: user?.address.address || '',
    state: user?.address.state || '',
    city: user?.address.city || '',
    zip: user?.address.zip || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });


  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
    
      axios.post('user/buywaecpin', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        phone: formState.phone,
        variant: formState.variant, 
        amount: formState.amount, 
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
     // reset();
     } catch (error) {
      console.error(error);
    }
  };
 
   
  const [post, setPost] = useState(null);
  const {general} = useAuth();

  useEffect(() => {
    axios.get('/waec_forms').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.forms);
  const CATEGORY_OPTION = JSON.parse(results);
 
  const getamount = (event) => {
    const amount = event.target.options[event.target.selectedIndex].dataset.amount;
    document.getElementById("total").innerHTML = amount;
    document.getElementById("amount").value = amount;
     
  };

 
  if (!CATEGORY_OPTION) return <SkeletonProductItem  sx={{ width: 40 }} />;
  
  return (
    <Page>
      
    <RootStyle>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
       
      <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            WAEC PIN Vending
          </Typography>
        </Stack>
         
          <Stack spacing={3} mt={5}>
        <TextField type="number"  name="phone" id="phone" fullWidth label="Phone Number" />
          </Stack>
          <input name="amount" id="amount" hidden/>
          <Stack spacing={3} mt={5}>
            
        <RHFSelect name="variant" onChange={getamount} label="Form Type">
                  <option selected disabled>Select Form</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option data-amount={category.variation_amount}  key={category.id} value={category.variation_code}>
                          {category.name}
                    </option>
                   ))}
        </RHFSelect>
      
         
        </Stack>
 
        
        <Divider sx={{ borderStyle: 'dashed' }} />
         
          <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total
          </Typography>
          <Typography variant="h6" component="p">
         {general.cur_sym} <a id="total">0.00</a>
          </Typography>
        </Stack> 
      </Stack>

     
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Buy Form'}
             
      </LoadingButton>
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
