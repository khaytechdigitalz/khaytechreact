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
    
      axios.post('user/billpay', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        number: formState.number,
        meter: formState.meter, 
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
    axios.get('/networks').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.utility);
  const fee = JSON.stringify(post.data.data.utilityfee);
  const CATEGORY_OPTION = JSON.parse(results);
  const CHARGE = JSON.parse(fee);

  const getamount = (event) => {
    document.getElementById("customer").innerHTML = "Select Meter";
    document.getElementById("customername").value = false;
    const dnumber = document.getElementById('number').value;
    const discount = event.target.options[event.target.selectedIndex].dataset.discount;
    const metertype = event.target.options[event.target.selectedIndex].dataset.metertype;
    document.getElementById("total").innerHTML = CHARGE;
     try {
      axios.post('/user/validatemeter', { 
        number: dnumber,
        meter: metertype,
       })
     .then(res => { 

      if(res.data.code === 200)
      {
        enqueueSnackbar(res.data.message);
        document.getElementById("customer").innerHTML = res.data.data.customername;
        document.getElementById("customername").value = res.data.data.customername;
      }
      else
      {
        enqueueSnackbar(res.data.message, {variant:'error'});
        document.getElementById("customer").innerHTML = "Invalid";
        document.getElementById("customername").value = false;
      } 

     })
   } catch (error) {
     console.error(error);
     document.getElementById("customer").innerHTML = "Invalid Number";
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
            ELectricity Bills Payment
          </Typography>
        </Stack>
        

        <Stack spacing={3} mt={5}>
        <TextField type="number"  onKeyUp={getamount} name="number" id="number" fullWidth label="Meter Number" />
          </Stack>

          <Stack spacing={3} mt={5}>
        <TextField type="number"  name="amount" id="amount" fullWidth label="Amount" />
          </Stack>

          <input name="customer" id="customername" hidden/>
       
          <Stack spacing={3} mt={5}>
            
        <RHFSelect 
          
        name="meter" onChange={getamount} label="Service Provider">
                  <option selected disabled>Select Provider</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option  data-metertype={category.billercode}  key={category.id} value={category.billercode}>
                          {category.name} ( {category.symbol}) 
                    </option>
                   ))}
        </RHFSelect>
      
         
        </Stack>

        <Stack spacing={3} mt={5}>
            
        <RHFSelect 
          
        name="type" label="Meter Type">
        <option value="prepaid">Prepaid</option> 
                  <option value="postpaid">Postpaid</option>                  
        </RHFSelect>
      
         
        </Stack>

        
        <Divider sx={{ borderStyle: 'dashed' }} />
         <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Fees
          </Typography>
          <Typography variant="h6" component="p">
          {general.cur_sym}<a id="total">0.00</a>
          </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Customer
          </Typography>
          <Typography variant="h6" component="p">
          <a id="customer">:</a>
          </Typography>
        </Stack> 
      </Stack>

     
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Pay Bill'}
             
      </LoadingButton>
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
