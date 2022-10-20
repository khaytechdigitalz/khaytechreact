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
  BettingSelect,BettingLog
} from './bills';
 
// ----------------------------------------------------------------------

export default function Internet() {
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'md');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Sport Betting">
         <Container>
         <HeaderBreadcrumbs
          heading={'Sport Betting' }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
           
            { name: 'Bills' },
            { name: 'Sport Betting' },
          ]}
        />
        
          

          <Grid container spacing={isDesktop ? 3 : 5}>
             <Grid item xs={12} md={12}>
              <BettingSelect />
            </Grid>
 

            <Grid item xs={12} md={12} lg={12}>
            <BettingLog />
            </Grid>

 
          </Grid>
        </Container>
     </Page>
  );
}
