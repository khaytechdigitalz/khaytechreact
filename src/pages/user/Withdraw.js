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
  WithdrawInput,WithdrawBar,WithdrawLog,WithdrawPie
} from './finance';


// ----------------------------------------------------------------------

export default function RequestFund() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Withdraw">
         <Container>
         <HeaderBreadcrumbs
          heading={'Request Withdrawal' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Request Withdrawal' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={12}>
              <WithdrawInput />
            </Grid>

            <Grid item xs={12} md={5}>
              <WithdrawPie />
            </Grid>

            <Grid item xs={12} md={7}>
              <WithdrawBar />
            </Grid>


            <Grid item xs={12} md={12} lg={12}>
            <WithdrawLog />
            </Grid>

          </Grid>
        </Container>
     </Page>
  );
}
