import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';

// @mui
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  Container,
  Stack,
  Switch,
} from '@mui/material';
// utils
import { LoadingButton } from '@mui/lab';

import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Image from '../../../components/Image';
import Scrollbar from '../../../components/Scrollbar';
//
import Iconify from '../../../components/Iconify';


import Page from '../../../components/Page';

import {
  SkeletonProductItem,
} from '../../../components/skeleton';
import axios from '../../../utils/axios';
import useResponsive from '../../../hooks/useResponsive';

import useAuth from '../../../hooks/useAuth';
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../../../sections/payment';
 
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails() {
  const isDesktop = useResponsive('up', 'md');

  const theme = useTheme();
  const { general } = useAuth();

  const [post, setPost] = React.useState(null);
  const params = useParams();
  const trx = params.id;
  const url = '/user/print/token/';
  React.useEffect(() => {
    axios.get(url+trx).then((response) => {
      setPost(response);     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.details);
  const info = JSON.stringify(post.data.data.info);
  const Details = JSON.parse(info);  
  const personObject = JSON.parse(results);  
  const result = Object.entries(personObject);

console.log(result);


  return (
    <>
    <Page title="Payment">
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        {Details.network}
      </Typography>

      <Stack spacing={2.5}>
      {result.map((row,index) => (
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
          {row[0] || ''}
          </Typography>
          <Label color="primary" variant="filled">
          {row[1] || 'Null'}
          </Label>
        </Stack>
      ))}
         
        

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Billed
          </Typography>
          <Typography variant="h6" component="p">
          {general.cur_sym}{fCurrency(Details.amount)}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>
 
 

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">{fDate(Details.created_at)}</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
         {Details.trx}
        </Typography>
      </Stack>
    </RootStyle>
    </Page>

       
    </>
  );
}
