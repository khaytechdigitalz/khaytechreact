import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';
// _mock
import { countries } from '../../../_mock';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user,avatar } = useAuth();

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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (formState) => {
    
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form); 
      axios.post('/user/profile-setting',formData, { 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        firstname: formState.firstname,
        lastname: formState.lastname,
        about: formState.about,
        country: formState.country,
        address: formState.address,
        city: formState.city,
        state: formState.state,
        zip: formState.zip,
        image: formState.image,
       })
      .then(res => {
        console.log(res);
        console.log(res.data);
        enqueueSnackbar(res.data.message);
      })

    } catch (error) {
      console.error(error);
    }
  };

  

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const slash = '/';
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="image"
              accept="image/*"
               maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            

             
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstname" disabled label="Firstname" />
              <RHFTextField name="lastname" disabled label="Lastname" />
              <RHFTextField name="email"   disabled   focus label="Email Address" />

              <RHFTextField name="mobile"  disabled   focus label="Phone Number" />

              <RHFSelect name="country" label="Country" placeholder="Country">
                <option selected value={user.address.country} >{user?.address.country}</option>
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="address"   label="Address" />

              <RHFTextField name="state"   label="State/Region" />

              <RHFTextField name="city" label="City" />
              <RHFTextField name="zip"  label="Zip/Code" />
              <RHFTextField
                  name="image"
                  accept="image/*"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                     type: 'file',
                  }}
                />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
