import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../../hooks/useAuth';

// components
import { FormProvider, RHFSwitch } from '../../../components/hook-form';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const ACTIVITY_OPTIONS = [
  {
    value: 'deposit',
    label: 'Email me when i make wallet deposit',
  },
  {
    value: 'withdrawal',
    label: 'Email me when i make withdrawal',
  },
  {
     value: 'referral', label: 'Email me when someone follows me'
  },
  {
     value: 'password', label: 'Email me i change password'
  },
];

const APPLICATION_OPTIONS = [
  { value: 'news', label: 'News and announcements' }
];

 
// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const notif = user.notification;
  const notify = JSON.parse(notif);

  const defaultValues = {
    deposit: notify.deposit,
    withdrawal: notify.withdrawal,
    referral: notify.referral,
    password: notify.password,
    news: notify.news,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
     handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formState) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      axios.post('/user/notification', { 
        deposit: formState.deposit,
        withdrawal: formState.withdrawal,
        password: formState.password, 
        referral: formState.referral, 
        news: formState.news, 
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

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Activity
            </Typography>

            <Stack spacing={1}>
              {ACTIVITY_OPTIONS.map((activity) => (
                <RHFSwitch key={activity.value} name={activity.value} label={activity.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Application
            </Typography>
            <Stack spacing={1}>
              {APPLICATION_OPTIONS.map((application) => (
                <RHFSwitch key={application.value} name={application.value} label={application.label} sx={{ m: 0 }} />
              ))}
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
