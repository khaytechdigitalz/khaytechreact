 // @mui
import { useState, useEffect,React } from 'react';
import { useNavigate} from "react-router-dom";
import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack,TextField } from '@mui/material';
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
  const navigate = useNavigate();

  const onSubmit = async (formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
    
      axios.post('user/convertairtime/manual', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        amount: formState.amount,
        network: formState.network,
        phone: formState.phone, 
       })
      .then(res => { 
        // Notification Starts;
        if(res.data.code === 200)
        { 
          enqueueSnackbar(res.data.message, {variant:'success'});
          navigate(`${res.data.ref}`, { replace: true });
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
  const discounted = JSON.stringify(post.data.data.conversion);
  const CATEGORY_OPTION = JSON.parse(results);
  const gettotal = (event) => {
    try {
     const fee = event.target.options[event.target.selectedIndex].dataset.conversion;
     const amount = document.getElementById('amount').value;
     const charge = fee/100*amount;
     document.getElementById("fee").innerHTML = charge;
     document.getElementById("total").innerHTML = amount-charge;
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
          <Typography variant="caption" component="p" sx={{ color: 'red' }}>
          <b>Note:</b> {general.sitename} does not automatically deduct airtime from your phone.<br/>
          <b>You are required to transfer the worth of airtime to the phone number displayed.</b><br/>
          It takes approximately 5 minutes for funds to be verified and credited to your E-wallet.
          </Typography> 
          
        </Stack>
        <Stack spacing={3} mt={5}> 
        <TextField type="number" name="phone" id="phone" fullWidth label="Enter Your Phone Number" />
          </Stack>

          <Stack spacing={3} mt={5}>
        <TextField type="number" name="amount"  onKeyUp={gettotal} id="amount" fullWidth label="Enter Amount To Convert" />
          </Stack>
        <Stack spacing={3} mt={5}>
        <RHFSelect name="network" onChange={gettotal}  label="Select Airtime Network">
                  <option selected disabled>Select Network</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option  data-conversion={category.conversion}  key={category.id} value={category.symbol}>
                          {category.name}
                    </option>
                   ))}
        </RHFSelect>

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
              {'Convert Airtime'}
              <Typography variant="subtitle2" component="p" sx={{ color: 'text.white' }}>
              &nbsp;&nbsp;&nbsp;(Fee:  {general.cur_sym}<a id="fee">0.0</a> )
              </Typography>  
      </LoadingButton>
      
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
