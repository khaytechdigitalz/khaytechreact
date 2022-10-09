import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks

import {useParams} from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstname: Yup.string().required('First name required'),
    lastname: Yup.string().required('Last name required'),
    username: Yup.string().required('Username required'),
    mobile: Yup.string().required('Phone Number required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const params = useParams();
  const urlstr = window.location.href;
  const url = new URL(urlstr);
  const searchparams = url.searchParams; 
  const refid =  searchparams.get('ref');

  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    reference: refid,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await register(data.email, data.password,data.firstname, data.username,  data.mobile, data.lastname,  data.reference);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstname" label="First name" />
          <RHFTextField name="lastname" label="Last name" />
        </Stack>
        <input value={refid} hidden readOnly name="reference"/>


        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="email" label="Email address" />
          <RHFTextField name="mobile" label="Phone Number" />
        </Stack>

        

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="username" label="Username" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        </Stack>

        

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
