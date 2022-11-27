// @mui
import { styled } from '@mui/material/styles';
import { Typography,  Card, CardContent, Alert } from '@mui/material';
//
import { UploadIllustration ,  SeverErrorIllustration } from '../../../assets';
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

export default function BvnSlider() {
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
        Bank Verification
        </Typography>
       
        {user?.bvn_verify !== '1' ? 
         <Alert severity="error">Bank Account Not Verified</Alert>
        : 
        <Alert severity="success">Bank Account Verified</Alert>
        }


       </CardContent>
       {user?.bvn_verify !== 1 ? <SeverErrorIllustration
        sx={{
          p: 3,
          width: 260,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      /> : 
      <UploadIllustration
      sx={{
        p: 3,
        width: 260,
        margin: { xs: 'auto', md: 'inherit' }
      }}
    /> }
      
    </RootStyle>
  );
}
