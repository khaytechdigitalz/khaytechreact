import {useNavigate,  Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// layouts
import { useSnackbar } from 'notistack';

import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from './forms/verify-code';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const resetemail = window.localStorage.getItem('resetemail');
  const navigate = useNavigate();
  if(resetemail == null)
  {
    window.location.href = PATH_AUTH.login;
    navigate(PATH_AUTH.login);
  }
  const { enqueueSnackbar } = useSnackbar();

  const resendmail = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      axios.post('/resend-code', { 
        email: resetemail, 
       })
      .then(res => {
        console.log(res.data);
        if(res.data.code === 200)
      {
        enqueueSnackbar(res.data.message);
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

  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
           

            <Typography variant="h3" paragraph>
              Please check your email!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We have emailed a 6-digit confirmation code to {resetemail}, please enter the code in box below to verify
              your email.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" href="#" underline="none" onClick={resendmail}>
                Resend code
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
