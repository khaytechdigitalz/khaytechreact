// @mui
import { useState, useEffect,React,useMemo } from 'react';
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
    
      axios.post('user/internetbuy', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        plan: formState.plan,
        network: formState.network,
        phone: formState.phone, 
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


  const {general} = useAuth();
  const CATEGORY_OPTION = [
    {
      "name": "Airtel",
      "symbol": "airtel"
  },
  {
      "name": "Globacom",
      "symbol": "glo"
  },
  {
      "name": "MTN",
      "symbol": "mtn"
  },
  {
      "name": "9mobile",
      "symbol": "9mobile"
  }
];
  const PLAN_OPTION = [];
  const getamount = (event) => { 
  const cost = event.target.options[event.target.selectedIndex].dataset.cost;
  document.getElementById("total").innerHTML = cost;
  }; 
 
const [post, setPost] = useState(null);

function updatePost(event) {
  const network = event.target.options[event.target.selectedIndex].dataset.network;
  axios
    .get(`/internetplans/${network}`, { 
    })
    .then((response) => {
      setPost(response.data);
    });
}

   const loading = true; 
  if (!CATEGORY_OPTION) return <SkeletonProductItem  sx={{ width: 40 }} />;
  
  return (
    <Page>
      
    <RootStyle>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Internet Subscription
          </Typography>
        </Stack>
        <Stack spacing={3} mt={5}>
        <TextField type="number" name="phone" id="phone" fullWidth label="Phone Number" />
          </Stack>

          <Stack spacing={3} mt={5}>
            
        <select 
          
        name="network" onChange={updatePost} label="Network">
                  <option selected disabled>Select Network</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option  data-network={category.symbol}  key={category.id} value={category.symbol}>
                          {category.name}
                    </option>
                   ))}
        </select>
      
        
        {(() => {
                if (!post ) {
                  return (
                    <SkeletonInputLoader  sx={{ width: 40 }} />
                  )
                } if (post.status != null ) {
                  return (
                   
                    <Stack spacing={3} mt={5}>
                    <RHFSelect onChange={getamount}  name="plan" label="Internet Plans">
                              <option selected disabled>Select Plan</option>
                              {post.data.plan.map((category) => (
                                <option  data-cost={category.cost}  key={category.id} value={category.plan}>
                                      {category.name}
                                </option>
                              ))}
                    </RHFSelect>
                    </Stack>
                  )
                }
                 
                 
              })()}
 
  
        </Stack>
       
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
              {'Buy Internet Data'}
             
      </LoadingButton>
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
