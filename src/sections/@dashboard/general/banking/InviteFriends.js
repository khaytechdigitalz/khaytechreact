// @mui
import * as Yup from 'yup';
import { styled, alpha } from '@mui/material/styles';
import { Card, Stack, Typography, Button } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import Image from '../../../../components/Image';
import useAuth from '../../../../hooks/useAuth';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import axios from '../../../../utils/axios';

// ----------------------------------------------------------------------

const ContentStyle = styled(Card)(({ theme }) => ({
  marginTop: -120,
  boxShadow: 'none',
  padding: theme.spacing(5),
  paddingTop: theme.spacing(16),
  color: theme.palette.common.white,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
}));
  

// ----------------------------------------------------------------------

export default function InviteFriends() {
  const { general } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const EmailSchema = Yup.object().shape({
    email: Yup.string().required('Please Enter Recipient\'s email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(EmailSchema),
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
      axios.post('/user/invite', { 
        email: formState.email, 
       })
      .then(res => {
        console.log(res);
        console.log(res.data);
        enqueueSnackbar(res.data.message);
      })
      reset();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Image
        visibleByDefault
        disabledEffect
        src="/images/invite.png"
        sx={{
          left: 40,
          zIndex: 9,
          width: 140,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />
      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">
            Invite friends <br /> and earn up to
          </Typography>
          <Typography variant="h2">{general?.cur_sym}50</Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          Enter your friend's email address below to invite to invite him or her.
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
           name="email"
            size="small"
            placeholder="Email"
            sx={{
              width: 1,
              color: 'common.white',
              fontWeight: 'fontWeightMedium',
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
              '& input::placeholder': {
                color: (theme) => alpha(theme.palette.common.white, 0.48),
              },
              '& fieldset': { display: 'none' },
            }}
          /> 

          <Button type="submit" color="warning" variant="contained">
          Invite Now
          </Button>
          </FormProvider>
        </Stack>
      </ContentStyle>
    </div>
  );
}
