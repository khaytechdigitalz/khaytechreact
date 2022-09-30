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
  CableTVInput,CableTVLog,CablePie
} from './bills';
 
// ----------------------------------------------------------------------

export default function Internet() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Cable TV">
         <Container>
         <HeaderBreadcrumbs
          heading={'Cable TV' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Bills' },
            { name: 'Cable TV' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={6}>
              <CableTVInput />
            </Grid>

            <Grid item xs={12} md={6}>
              <CablePie />
            </Grid>
 


            <Grid item xs={12} md={12} lg={12}>
            <CableTVLog />
            </Grid>

 
          </Grid>
        </Container>
     </Page>
  );
}
