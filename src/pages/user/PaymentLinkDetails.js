import { useEffect } from 'react';
 
 // @mui
import { Grid, Container  } from '@mui/material';
// redux
import { useDispatch } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import useResponsive from '../../hooks/useResponsive';

import {
PaymentLinkBar,PaymentLinkRequests,PaymentLinkPie
} from './payments';


// ----------------------------------------------------------------------

export default function Payout() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Payment Link Details">
         <Container>
         <HeaderBreadcrumbs
          heading={'View Payments' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'View Payments' },
          ]}
        />
         
          <Grid container spacing={isDesktop ? 3 : 5}>
            
            <Grid item xs={12} md={4}>
              <PaymentLinkPie />
            </Grid>

            <Grid item xs={12} md={8}>
              <PaymentLinkBar />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
            <PaymentLinkRequests />
            </Grid>

          </Grid>
        </Container>
     </Page>
  );
}
