import { useEffect } from 'react';
 // @mui
import {  Grid, Container  } from '@mui/material';
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
  PaymentLinkInput,
  PaymentLinkLog
} from './payments';

// ----------------------------------------------------------------------

export default function PaymentLinkDetails() {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Payment">
         <Container>
         <HeaderBreadcrumbs
          heading={'Payment Link' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Request Payment Link' },
          ]}
        />         

          <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={4}>
              <PaymentLinkInput />
            </Grid>
             <Grid item xs={12} md={8}>
              <PaymentLinkLog />
            </Grid>
        
 
           
          </Grid>
        </Container>
     </Page>
  );
}
