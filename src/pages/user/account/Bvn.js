import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
 import { useMemo } from 'react';
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
  BvnSlider, 
  } from '.';
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
 
  const { enqueueSnackbar } = useSnackbar();

  const forminput = Yup.object().shape({
    bvn: Yup.string().required('Enter Bank Verification')
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

    
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/resolve_bvn', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        bvn: formState.bvn
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
              <RHFTextField name="bvn" label="Bank Verification Number" />
            </Stack>
          </Card>
          <br/>
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {'Validate BVN'}
            </LoadingButton>
        </Grid>
        

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
          <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Account Summary"
      />

      <CardContent>
        <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Firstname
            </Typography>
            <Typography variant="subtitle2">John</Typography>
          </Stack> 
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Lastname
            </Typography>
            <Typography variant="subtitle2">John</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Address
            </Typography>
            <Typography variant="subtitle2">Ireposun Street, Akure</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Gender
            </Typography>
            <Typography variant="subtitle2">Male</Typography>
          </Stack>
 
        </Stack>
      </CardContent>
    </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
