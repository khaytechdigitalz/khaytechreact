// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { 
  ReferralLog, 
  ReferralLink,
  } from './account';

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
              <ReferralLink /> 
           </Grid>

            
          
          <Grid item xs={12} lg={12}>
            <ReferralLog />
          </Grid>
 
        </Grid>
      </Container>
    </Page>
  );
}
