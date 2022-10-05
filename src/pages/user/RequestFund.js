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
  RequestPaymentInput,RequestPaymentBar,RequestPaymentLog,RequestPaymentPie
} from './payments';


// ----------------------------------------------------------------------

export default function Payout() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Request Fund">
         <Container>
         <HeaderBreadcrumbs
          heading={'Request Fund' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Request Fund' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={12}>
              <RequestPaymentInput />
            </Grid>

            <Grid item xs={12} md={5}>
              <RequestPaymentPie />
            </Grid>

            <Grid item xs={12} md={7}>
              <RequestPaymentBar />
            </Grid>


            <Grid item xs={12} md={12} lg={12}>
            <RequestPaymentLog />
            </Grid>

          </Grid>
        </Container>
     </Page>
  );
}
