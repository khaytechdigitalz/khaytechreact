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
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
 // components
import {
  FormProvider,
   RHFSelect,
   RHFTextField,
  
} from '../../../components/hook-form';
import axios from '../../../utils/axios';

import { 
  KycSlider, 
  } from '.';
// ----------------------------------------------------------------------


const CATEGORY_OPTION = [
  { group: 'Governmemt', classify: ['Voters Card', 'Drivers License', 'International Passpord', 'NIN Slip'] },
  { group: 'Others', classify: ['Work ID Card', 'Community ID Card', 'Association ID Card', 'Passport Photograph'] },
];
 

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
    number: Yup.string().required('Enter ID Numner'),
    expiry: Yup.string().required('ID expiry date is required'),
    issued_date: Yup.string().required('ID issued date is required'),
    type: Yup.string().required('Please select ID type'),
    image: Yup.array().min(1, 'Image is required'),
   });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
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
      axios.post('/user/postkyc', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        number: formState.number,
        issued_date: formState.issued_date,
        expiry: formState.expiry, 
        type: formState.type, 
        image: formState.image,

       })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          window.location.reload(false);
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
            <KycSlider />
          </Grid>

          

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="number" label="ID Number" />

              <RHFSelect name="type" label="Type">
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </RHFSelect>
              
              <div>
    
           
                <LabelStyle>Upload ID Images</LabelStyle>
                <RHFTextField
                  name="image"
                  accept="image/*"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                     type: 'file',
                  }}
                />
 
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="issued_date"
                  label="Issued Date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                     type: 'date',
                  }}
                />

                <RHFTextField
                  name="expiry"
                  label="Expiry Date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                     type: 'date',
                  }}
                />
              </Stack>

             </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {'Upload Document'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
