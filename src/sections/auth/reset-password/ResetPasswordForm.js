import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { useSnackbar } from 'notistack';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });


  const { enqueueSnackbar } = useSnackbar();
 
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

 

  const onSubmit = async (data, formState) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isMountedRef.current) {

        axios.post('/password/email', { 
          email: data.email, 
         })
        .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          onSent();
          onGetEmail(data.email);
        }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }

        })

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
