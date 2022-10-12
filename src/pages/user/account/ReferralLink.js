// @mui
import * as Yup from 'yup';
import { styled, alpha } from '@mui/material/styles';
import { Card, Stack, Typography, Button, OutlinedInput } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import Image from '../../../components/Image';
import useAuth from '../../../hooks/useAuth';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import axios from '../../../utils/axios';
import { fCurrency } from '../../../utils/formatNumber';

import { PATH_AUTH } from '../../../routes/paths';
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
  const { general,user, sitelogo } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const host = window.location.origin;
  const baseurl =PATH_AUTH.register;
  const endpoint =`/?ref=${user.username}`;
  const copylink = async () => {

    const copyText = document.getElementById("referralURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999);  
    document.execCommand("copy");
    enqueueSnackbar('Referral Link Copied');
  
  
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
           Referral Balance. 
          </Typography>
          <Typography variant="h2">{general?.cur_sym}{fCurrency(user?.ref_bonus)}</Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          Please click below to copy your referral link
        </Typography>
        
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
       
          <OutlinedInput
           name="email"
           id="referralURL"
           value={host+baseurl+endpoint}
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

          <Button onClick={copylink} color="warning" variant="contained">
          Copy
          </Button>
          {PATH_AUTH.signup876}
          
        </Stack>
       </ContentStyle>
    </div>
  );
}
