// @mui
import { styled } from '@mui/material/styles';
import { useState, useEffect,React } from 'react';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { PricingPlan } from './account';
import useAuth from '../../hooks/useAuth';
import axios from '../../utils/axios';

import {
  SkeletonProductItem,
} from '../../components/skeleton';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  // paddingTop: theme.spacing(15),
 //  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Pricing() {

  const [post, setPost] = useState(null);
  const {general} = useAuth();

  useEffect(() => {
    axios.get('/user/upgradeplans').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.plans);
  const CATEGORY_OPTION = JSON.parse(results);
  if (!CATEGORY_OPTION) return <SkeletonProductItem  sx={{ width: 40 }} />;

  return (
    <Page title="Upgrade">
      <RootStyle>
        <Container>
          <Typography variant="h3" align="center" paragraph>
            Flexible plans for your
            <br /> transaction&apos;s volume and needs
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Choose your plan and earn super discount on every transaction
          </Typography>

           <Grid container spacing={3}>
            {CATEGORY_OPTION.map((card, index) => (
              <Grid item xs={12} md={4} key={card.id}>
                <PricingPlan card={card} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
