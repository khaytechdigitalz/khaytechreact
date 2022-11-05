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
  AirtimeBulkInput,Log
} from './bulkairtime';
 
  
// ----------------------------------------------------------------------

export default function AirtimeBulk() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Bulk Recharge">
         <Container>
         <HeaderBreadcrumbs
          heading={'Bulk Recharge' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Bills' },
            { name: 'Bulk Airtime Recharge' },
          ]}
        />
        
          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={12}>
              <AirtimeBulkInput />
            </Grid>
            <Grid item xs={12} md={12}>
              <Log />
            </Grid>
 
          </Grid>
        </Container>
     </Page>
  );
}
