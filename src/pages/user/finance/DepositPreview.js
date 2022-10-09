import PropTypes from 'prop-types';
import {useParams, useNavigate} from 'react-router-dom';
import { useSnackbar } from 'notistack';
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

import PaystackPop from '@paystack/inline-js';
import {
  useFlutterwave,
  FlutterWaveButton,
  closePaymentModal
} from "flutterwave-react-v3";


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
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
import { PATH_DASHBOARD } from '../../../routes/paths';

import axios from '../../../utils/axios';
import useResponsive from '../../../hooks/useResponsive';

import useAuth from '../../../hooks/useAuth';
import useTable, { emptyRows } from '../../../hooks/useTable';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { HOST_URL } from '../../../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

// ----------------------------------------------------------------------

DepositPreview.propTypes = {
  invoice: PropTypes.object.isRequired,
};


export default function DepositPreview() {
  
  const [datas, setData] = React.useState('');
  const getAllData = () => {
    axios.get("/user/deposit/confirm/1A9YYF")
    .then((response) => {
    console.log(response);
    setData(response.data);
    })
    .catch((error) => {
    console.log(error);
    });
    };
    React.useEffect(() => {
      getAllData();
},[]);
 
  console.log();

  const isDesktop = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { general } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);
  const params = useParams();
  const trx = params.id;
  const url = '/user/deposit/confirm/';
  React.useEffect(() => {
    axios.get(url+trx).then((response) => {
      setPost(response);     
    });
  }, []);
  const data = post; 
  const isNotFound = (!data );

  const config = {
    public_key: "FLWPUBK_TEST-5ea2b80ca78e6a9922ed8a8fc64a5d18-X",
    tx_ref: Date.now(),
    currency: "NGN",
    amount: 100,
    payment_options: "card,mobilemoney",
    customer: {
      email: "herveralive@gmail.com",
      phonenumber: "+250786007267",
      name: "Herve Nkurikiyimfura"
    },

    customizations: {
      title: "SMS",
      description: "Payment for items in cart",
      logo: "https://avatars.githubusercontent.com/u/35837984?s=200&v=4"
    }
  };

  const handleFlutterPayment = useFlutterwave(config);
 

  if (!data) return <SkeletonProductItem  sx={{ width: 40 }} />;

  const handlePayment = async (event, formState) => {
  const gateway = data.data.data.name;
  await new Promise((resolve) => setTimeout(resolve, 500));

  // PAYSTACK OPERATION STARTS*/
  if(gateway === 'Paystack')
  {
    const verify = '/ipn/paystack';
    const verifyurl = HOST_URL+verify;
    const paystack = new PaystackPop();
    paystack.newTransaction({
    key: data.data.data.key,
    email: data.data.data.email,
    amount: data.data.data.amount*100,
  
     onSuccess: (transaction) => { 
      const message = transaction.message;
      const trans = transaction.reference;
      const refid = data.data.data.ref;
      enqueueSnackbar(message);
      console.log(trans);
      try { 
      const form = document.querySelector("form");
      axios.post('/ipn/paystack',{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        reference: refid,
        paystacktrxref: trans,
        })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          navigate(`../deposits`, { replace: true });
        }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }
      })
      
       } catch (error) {
        console.error(error);
      }
     // console.log(transaction);
    },
    onCancel: () => {
      enqueueSnackbar('Canceled', {variant:'error'});
    }
    });
      }
    // PAYSTACK OPERATION ENDS*/
     
   
    // FLUTTERWAVE OPERATION STARTS*/
    if(gateway === 'Flutterwave')
    {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          enqueueSnackbar(response.data.status);
          closePaymentModal();
        },
        onClose: () => {
          console.log("You close me ooo");
          enqueueSnackbar('Failed Process', {variant:'error'});
        }
      });
    }
   // FLUTTERWAVE OPERATION ENDS*/

};

 
 
  return (
    <>

<Page title="Payment">
         <Container>
         <HeaderBreadcrumbs
          heading="Deposit"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Preview Deposit' },
          ]}
          />
         
          <Grid container spacing={isDesktop ? 3 : 5}>
             
            <Grid item xs={12} md={12}>
            <RootStyle>

      <Typography variant="subtitle1" sx={{ mb: 5, color: 'red' }}>
       {data.data.data.message}  
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>
          <Label color="primary" variant="filled">
          {data.data.data.name}
          </Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography component="p" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            TRX Ref Code
          </Typography>
          <Label color="info" variant="filled">
          {data.data.data.ref}
          </Label>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography sx={{ color: 'text.secondary' }}>{data.data.data.currency}</Typography>
          <Typography variant="h5" sx={{ mx: 1 }}>
           {fCurrency(data.data.data.amount)}
          </Typography> 
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
            Total Billed
          </Typography>
          <Typography variant="h6" component="p">
          {fCurrency(data.data.data.amount)}<small>{data.data.data.currency}</small>
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>
      
      <LoadingButton onClick={handlePayment} fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }}>
       Make Payment
      </LoadingButton> 
       

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure Payment System</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>

                  
    </RootStyle>

        

            </Grid>
          </Grid>
          
        </Container>
      
     </Page>
        
    </>
  );
}
