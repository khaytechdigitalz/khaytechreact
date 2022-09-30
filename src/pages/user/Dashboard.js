// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
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

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
           

          <Grid item xs={12} md={12}>
            <CurrentBalance  displayName={user?.username}/>
          </Grid>
 
          <Grid item xs={12} md={6}>
            <Widget title="Bonus Wallet Balance" currency={general?.cur_sym} total={user?.ref_bonus}  icon={<OrderCompleteIllustration />} />
          </Grid>
 

          <Grid item xs={12} md={6}>
            <Widget title="Pending Balance" currency={general?.cur_sym} total={user?.hold_balance}  icon={<MaintenanceIllustration />} />
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
