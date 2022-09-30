/* eslint-disable camelcase */
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui

import { useTheme,styled } from '@mui/material/styles';
import { Box, Link, Card, CardHeader, Typography, Stack, 
  Button,
  Divider } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// _mock_
import Iconify from '../../../components/Iconify';
//
import Image from '../../../components/Image';
import Scrollbar from '../../../components/Scrollbar';
import { ColorPreview } from '../../../components/color-utils';
import axios from '../../../utils/axios';
import { HOST_URL } from '../../../config';
import useAuth from '../../../hooks/useAuth';
import Label from '../../../components/Label';
import Page from '../../../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
   backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));
export default function DepositRecent() {

  const [post, setPost] = useState(null);
      
  useEffect(() => {
    axios.get('/user/deposit/recent').then((response) => {
      setPost(response);
      console.log('it has been loged');
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.deposit);
  const CATEGORY_OPTION = JSON.parse(results);


  return (
    <Page>
      <RootStyle>
      <CardHeader title="Last 7 Deposits" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
        {Array.isArray(CATEGORY_OPTION)
        ? CATEGORY_OPTION.map((product, id) => (
            <ProductItem key={product.id} product={product} />
            )) :null}
        </Stack>
        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
        
          <Link component={RouterLink} to="../deposits" size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
            View All
          </Link>
        </Box>
      </Scrollbar>
      </RootStyle>

    </Page>
  );
}

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
  }),
};

function ProductItem({ product }) {
  const { name, amount,gateway,created_at,status } = product;
  const hasSale = amount > 0;
  const { user,general } = useAuth();
  const theme = useTheme();
  const location = "assets/images/gateway/";

  return (
    <Stack direction="row" spacing={2}>
      <Image alt={gateway.name} src={HOST_URL+location+gateway.image} sx={{ width: 30, height: 30, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link component={RouterLink} to="#" sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {gateway.name}
        </Link>
        
        <Stack direction="row">
        <Link  sx={{ color: 'text.primary', typography: 'subtitle2' }}>
        {fDate(created_at)}
        </Link>
        </Stack>

       
      </Box>


      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
       
      <Stack direction="row">
         <Typography variant="body2" sx={{ color: 'text.primary' }}>
         {general.cur_sym} {fCurrency(amount)}
          </Typography>
        </Stack>
        <Stack direction="row">
         <Typography variant="body2">
         <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status !== 1 && 'error') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
           {(() => {
                if (status !== 1) {
                  return (
                    <div>Incomplete</div>
                  )
                }
                if (status === 1) {
                  return (
                    <div>Successful</div>
                  )
                }
                 
              })()}
        </Label>
          </Typography>
          <Divider />
        </Stack>
      </Box>
     

    </Stack>
  );
}
