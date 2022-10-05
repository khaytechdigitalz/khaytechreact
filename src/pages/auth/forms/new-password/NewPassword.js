import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { useSnackbar } from 'notistack';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import axios from '../../../../utils/axios';
import { PATH_AUTH } from '../../../../routes/paths';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};
export default function ResetPasswordForm({ onSent, onGetEmail }) {

  const resettoken = window.localStorage.getItem('resettoken');
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();

  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  const defaultValues = {
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });
  
  const { enqueueSnackbar } = useSnackbar();
 
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

 

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
        axios.post('/password/reset', { 
          token: resettoken,
          password: data.password,
          password_confirmation: data.password_confirmation,   
         })
        .then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          window.localStorage.removeItem('resettoken');
          navigate(PATH_AUTH.login, { replace: true });
          }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }

        })

    } catch (error) {
      console.error(error);
    }
  };

  if(!resettoken)
  {
    navigate(PATH_AUTH.login, { replace: true });
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
      <RHFTextField name="password" type="password" label="New Password" />

      <RHFTextField name="password_confirmation" type="password" label="Confirm New Password" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
