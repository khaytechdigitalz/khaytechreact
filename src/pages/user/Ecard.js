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
  EcardInput, EcardRecent
} from './finance';

// ----------------------------------------------------------------------

export default function Deposit() {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecard">
         <Container>
         <HeaderBreadcrumbs
          heading={'E-card' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'E-card' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={6}>
              <EcardInput />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
            <EcardRecent />
          </Grid>
 
           
          </Grid>
        </Container>
     </Page>
  );
}
