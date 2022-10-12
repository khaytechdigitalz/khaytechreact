import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
 import { useState, useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Box,Divider, Card, Grid, Stack, Typography, CardContent, CardHeader} from '@mui/material';
// routes
 // components
import {
  FormProvider,
   RHFSelect,
   RHFTextField,
  
} from '../../../components/hook-form';
import axios from '../../../utils/axios';


import {
  SkeletonInputLoader,
} from '../../../components/skeleton';

import { 
  BvnSlider, 
  } from '.';
  import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

 
 

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

Kyc.propTypes = {
  currentProduct: PropTypes.object,
};

export default function Kyc({ currentProduct }) {
 
  const { user, general } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const forminput = Yup.object().shape({
    account_number: Yup.string().required('Enter Account Number'),
    account_bank: Yup.string().required('Select Bank')
   });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(forminput),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get('/banklist').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonInputLoader  sx={{ width: 40 }} />;
 
  const results = JSON.stringify(post.data.data);
  const CATEGORY_OPTION = JSON.parse(results);


  const bank = JSON.parse(user.bank_details);  
  const bankv = Object.entries(bank);
    
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/resolve_bvn', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        account_bank: formState.account_bank,
        account_number: formState.account_number,
        bvn: formState.bvn,
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
      reset();
     } catch (error) {
      console.error(error);
    }
  };
 
 
  
  return (

         
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Grid container spacing={3}>

         <Grid item xs={12} md={12}>
            <BvnSlider />
          </Grid>
 
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="bvn" label="Enter BVN" />
            </Stack>
            <br/>
             <Stack spacing={3}>
              <RHFTextField name="account_number" label="Account Number" />
            </Stack>
           
            <Stack spacing={3} mt={5}>
               <RHFSelect name="account_bank" label="Bank" >
                  <option selected disabled>Please Select Bank</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option data-code={category.code} key={category.id} value={category.code}>
                          {category.name}
                    </option>
                   ))}
                 </RHFSelect>
            </Stack>
            <Typography variant="caption" component="p" sx={{ color: 'red' }}>
          <b>Please Note:</b> The name on your bank account must be the same name you used used when you registerd your account on {general.sitename}<br/>
          Validating your BVN cost {general.cur_sym}{general.bvn_fee} per successful validation.
          </Typography> 
          </Card>
          <br/>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {'Validate Bank'}
          </LoadingButton>
        </Grid>
        

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
          <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Bank Account Summary"
      />

      <CardContent>
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
      </CardContent>
    </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
