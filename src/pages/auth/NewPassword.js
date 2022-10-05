import {useNavigate,  Link as RouterLink } from 'react-router-dom';
// @mui

import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { NewPassword } from './forms/new-password';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));
// ----------------------------------------------------------------------

export default function NewPasswords() {

const resettoken = window.localStorage.getItem('resettoken');

const navigate = useNavigate();
if(!resettoken)
{
  window.location.href = PATH_AUTH.login;
  navigate(PATH_AUTH.login, { replace: true });
}
  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            
            <Typography variant="h3" paragraph>
             Reset Password
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
             Please fill the form below to reset your account password
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <NewPassword />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <Link variant="subtitle2" underline="none" onClick={() => {}}>
                Resend code
              </Link>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
