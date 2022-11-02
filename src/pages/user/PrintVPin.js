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
  VPinInput,VPinLog
} from './bills';
 
// ----------------------------------------------------------------------

export default function PrintVPin() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Airtime">
         <Container>
         <HeaderBreadcrumbs
          heading={'Print V-Pin' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Bills' },
            { name: 'Print V-Pin' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={12}>
              <VPinInput />
            </Grid>
 
            <Grid item xs={12} md={12} lg={12}>
            <VPinLog />
            </Grid>

 
          </Grid>
        </Container>
     </Page>
  );
}
