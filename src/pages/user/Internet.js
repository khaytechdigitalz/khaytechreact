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
  InternetInput,InternetLog,InternetPie
} from './bills';
 
// ----------------------------------------------------------------------

export default function Internet() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Internet">
         <Container>
         <HeaderBreadcrumbs
          heading={'Internet' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Bills' },
            { name: 'Internet' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={6}>
              <InternetInput />
            </Grid>

            <Grid item xs={12} md={6}>
              <InternetPie />
            </Grid>
 


            <Grid item xs={12} md={12} lg={12}>
            <InternetLog />
            </Grid>

 
          </Grid>
        </Container>
     </Page>
  );
}
