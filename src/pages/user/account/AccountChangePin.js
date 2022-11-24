import {useNavigate,  Link as RouterLink } from 'react-router-dom';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    current_password: Yup.string().required('Account Password is required'),
    password: Yup.string().min(6, 'Pin must be at least 4 characters').required('New Pin is required'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Pin must match'),
  });

  const defaultValues = {
    current_password: '',
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formState) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      axios.post('/user/change-pin', { 
        current_password: formState.current_password,
        password: formState.password,
        password_confirmation: formState.password_confirmation, 
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
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="current_password" type="password" label="Account Password" />

          <RHFTextField name="password" type="password" label="New Pin" />

          <RHFTextField name="password_confirmation" type="password" label="Confirm New Pin" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update Pin
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
