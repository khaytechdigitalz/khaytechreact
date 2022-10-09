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
  DepositInput, DepositRecent
} from './finance';

// ----------------------------------------------------------------------

export default function Deposit() {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Payment">
         <Container>
         <HeaderBreadcrumbs
          heading={'Ecard Deposit' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Wallet Deposit' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={4}>
              <DepositInput />
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
            <DepositRecent />
          </Grid>
 
           
          </Grid>
        </Container>
     </Page>
  );
}
