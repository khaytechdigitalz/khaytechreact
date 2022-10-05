// @mui
import { styled } from '@mui/material/styles';
import { Typography,  Card, CardContent } from '@mui/material';
//
import { UploadIllustration } from '../../../assets';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

export default function KycSlider() {
  const { user } = useAuth();

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
        {user?.kyc !== 1 ? 'Account Not Verified !!!' : 'Account Verified !' }
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
        {user?.kyc !== 1 ? 'You account has not been verified yet. Please upload a means of identification to begin process' : 'You account has been verified on. You account is now ppen to promotional offers and freebies. ' }
        </Typography>

       </CardContent>

      <UploadIllustration
        sx={{
          p: 3,
          width: 260,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
