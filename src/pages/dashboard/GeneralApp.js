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
} from '../../sections/@dashboard/general/app';

import { 
  InviteFriends,
   CurrentBalance, 
} from '../../sections/@dashboard/general/banking';

import { 
  WidgetSummary, 
} from '../../sections/@dashboard/general/booking';
import { OrderCompleteIllustration, MaintenanceIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user,general } = useAuth();
   const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
           

          <Grid item xs={12} md={12}>
            <CurrentBalance  displayName={user?.username}/>
          </Grid>
 
          <Grid item xs={12} md={6}>
            <WidgetSummary title="Bonus Wallet Balance" currency={general?.cur_sym} total={user?.ref_bonus}  icon={<OrderCompleteIllustration />} />
          </Grid>
 

          <Grid item xs={12} md={6}>
            <WidgetSummary title="Pending Balance" currency={general?.cur_sym} total={user?.hold_balance}  icon={<MaintenanceIllustration />} />
          </Grid>

           


          <Grid item xs={12} md={6} lg={4}>
            <AppLoginSession />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppDebitCredit />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewTRX />
          </Grid>
          <Grid item xs={12} md={4}>
              <InviteFriends />
           </Grid>
 
        </Grid>
      </Container>
    </Page>
  );
}
