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
  SavingsInput,SavingsLog,SavingsPie
} from './finance';


// ----------------------------------------------------------------------

export default function Savings() {
   const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');
 


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Payout">
         <Container>
         <HeaderBreadcrumbs
          heading={'Savings Plan' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Savings Plan' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={6}>
              <SavingsInput />
            </Grid>

            <Grid item xs={12} md={6}>
              <SavingsPie />
            </Grid>
 


            <Grid item xs={12} md={12} lg={12}>
            <SavingsLog />
            </Grid>

          </Grid>
        </Container>
     </Page>
  );
}
