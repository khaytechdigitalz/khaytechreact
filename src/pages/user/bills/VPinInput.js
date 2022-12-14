// @mui
import { useState, useEffect,React } from 'react';

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import {
  FormProvider,
   RHFSelect,
  } from '../../../components/hook-form';
  import axios from '../../../utils/axios';

  import useAuth from '../../../hooks/useAuth';
  import Page from '../../../components/Page';


import {
  SkeletonProductItem,
  SkeletonInputLoader,
} from '../../../components/skeleton';

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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
    
      axios.post('user/generatevpin', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        amount: formState.amount,
        unit: formState.unit,
        network: formState.network,
       })
      .then(res => { 
        // Notification Starts;
        if(res.data.code === 200)
        { 
          enqueueSnackbar(res.data.message, {variant:'success'});
         }
         enqueueSnackbar(res.data.message, {variant:'error'}); 
          if(res.data.error.length > 0){
            for (let i = 0; i < res.data.error.length; i+=1) {
              enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
              }
          }
        // Notification Ends;
      })
     // reset();
     } catch (error) {
      console.error(error);
    }
  };


   
  const [post, setPost] = useState(null);
  const {general} = useAuth();

  useEffect(() => {
    axios.get('/networks').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.phone);
  const discounted = JSON.stringify(post.data.data.airtimediscount);
  const CATEGORY_OPTION = JSON.parse(results);
  const DISCOUNT = JSON.parse(discounted);
  
  const gettotal = () => {
    try {
     const amount = document.getElementById('amount').value;
     const discount = DISCOUNT/100*amount;
     document.getElementById("discount").innerHTML = discount;
     document.getElementById("total").innerHTML = amount-discount;
     } catch (error) {
      console.error(error);
    }
  }; 
 
 
 
  if (!CATEGORY_OPTION) return <SkeletonProductItem  sx={{ width: 40 }} />;
  
  
  return (
    <Page>
    <RootStyle>

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Generate Airtime Pin
          </Typography>
        </Stack>
        <Alert severity="info">Ensure to check our pricing page before generating recarge card pin.
        {(() => {
                if (general.vpin_vendor === 'Payscribe') {
                  return (
                    
                    <div><br/><b>Please note that this PIN works for all mobiole telecommunication networks</b></div>

                  )
                }
                
                 
              })()}
              </Alert>

        <Stack spacing={3} mt={5}>
        <TextField type="number" name="unit" id="unit" fullWidth label="Enter Number of Units" />
          </Stack>

          <Stack spacing={3} mt={5}>
        <RHFSelect name="amount" label="Amount">
                     <option onChange={gettotal} selected disabled>Select Amount</option>
                     <option>100</option>
                     <option>200</option>
                     <option>500</option>
                     <option>1000</option>
                     <option>2000</option>
        </RHFSelect>
          </Stack>
          {(() => {
                if (general.vpin_vendor !== 'Payscribe') {
                  return (
                    
                    <Stack spacing={3} mt={5}>
                    <RHFSelect name="network" label="Network">
                              <option selected disabled>Select Network</option>
                              {CATEGORY_OPTION.map((category) => (
                                <option key={category.id} value={category.code}>
                                      {category.name}
                                </option>
                               ))}
                    </RHFSelect>
            
                    </Stack>
                   

                  )
                }
                
                 
              })()}
         
       
        <Divider sx={{ borderStyle: 'dashed' }} />
         <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Amount
          </Typography>
          <Typography variant="h6" component="p">
          {general.cur_sym}<a id="total">0.00</a>
          </Typography>
        </Stack> 
      </Stack>


     
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Generate VPin'}
              <Typography variant="subtitle2" component="p" sx={{ color: 'text.white' }}>
              &nbsp;&nbsp;&nbsp;(Discount:  {general.cur_sym}<a id="discount">0.0</a> )
              </Typography>  
      </LoadingButton>
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
