// @mui
import { Container, Grid,Box, Card, Stack, Divider,Button, CardHeader, Typography,styled  } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import styles from './custom.css';
import { fCurrency } from '../../utils/formatNumber';


// sections
import { 
  AppNewTRX, 
  AppDebitCredit,
  AppLoginSession, 
  InviteFriends,
  CurrentBalance, 
  Widget, 
  } from './home';

import { OrderCompleteIllustration, MaintenanceIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { user,general } = useAuth();
  const { themeStretch } = useSettings();
  const HEIGHT = 206;
  const ContentStyle = styled(Card)(({ theme }) => ({
    marginTop: 20,
    boxShadow: 'none',
    height: HEIGHT - 16,
    padding: theme.spacing(5),
    paddingTop: theme.spacing(16),
    color: theme.palette.common.white,
    backgroundImage: `linear-gradient(135deg,
      #4B3687 0%,
      #4B3687 100%)`,
  }));

const RowStyle = styled('div')({
  justifyContent: 'space-between',
});
  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <Typography  sx={{color: 'black'}}  variant="h4"> Hello, {user.username}</Typography>
        </Grid>
          <Grid item xs={12} md={6}>
          <Card sx={{ p: 3,  backgroundImage: `linear-gradient(135deg,
          #4B3687 0%,
          #4B3687 100%)` }}>
            <br/>  <br/>
          <Stack >
        <RowStyle>
        <Stack direction="row" divider={<Divider sx={{py: 4, color: 'white'}} orientation="vertical" flexItem />}>
            <Stack width={1} textAlign="center">
              <Typography variant="h6" sx={{color: 'white'}}>Account No.</Typography>
              <Typography variant="body2" sx={{color: 'white'}}>
                {user.account_number}
              </Typography>
            </Stack>
            <Stack width={1} textAlign="center">
              <Typography variant="h6" sx={{color: 'white'}}>Bank Name</Typography>
              <Typography variant="body2" sx={{color: 'white'}}>
                {user.bank_name}
              </Typography>
            </Stack>
            <Stack width={1} textAlign="center">
              <Typography variant="h6" sx={{color: 'white'}}>Account Name</Typography>
              <Typography variant="body2" sx={{color: 'white'}}>
               { user.account_name}
              </Typography>
            </Stack>
          </Stack>      
          <br/>   
        </RowStyle>
        
      </Stack>
    </Card>
          </Grid>

          
          <Grid item xs={12} md={6}>
          <Card sx={{ p: 3,  backgroundImage: `linear-gradient(135deg,
      #4B3687 0%,
      #4B3687 100%)` }}>
      

      <Stack spacing={2}>
       
        <RowStyle>
          <br/>
        <center>    
      <Typography  sx={{color: 'white'}}  variant="h4"> Wallet Balance &nbsp;&nbsp;&nbsp;{general.cur_sym} {fCurrency(user.balance)}</Typography>
      </center>

         
        </RowStyle>

        

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="contained" color="warning">
            Fund
          </Button>
          <Button fullWidth variant="contained"  color="success">
            Withdraw 
          </Button>
          <Button fullWidth variant="contained"  color="info">
            Transfer 
          </Button>
          
        </Stack>
        <br/>
      </Stack>
    </Card>
          </Grid>




          
          
          <Grid item xs={12} md={4}>
              <InviteFriends />
           </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppDebitCredit />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppLoginSession />
          </Grid>
          
          <Grid item xs={12} lg={8}>
            <AppNewTRX />
          </Grid>
 
        </Grid>
      </Container>
    </Page>
  );
}
