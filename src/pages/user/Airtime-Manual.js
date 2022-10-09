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
  ManualInput,ManualLog,ManualPie
,ManualBar
} from './conversion';


// ----------------------------------------------------------------------

export default function Savings() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Manual Airtime Conversion">
         <Container>
         <HeaderBreadcrumbs
          heading={'Airtime Conversion' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Manual Conversion' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={6}>
              <ManualInput />
            </Grid>

            <Grid item xs={12} md={6}>
              <ManualPie />
            </Grid> 
            <Grid item xs={12} md={12}>
              <ManualBar />
            </Grid> 

            <Grid item xs={12} md={12} lg={12}>
            <ManualLog />
            </Grid>

          </Grid>
        </Container>
     </Page>
  );
}
