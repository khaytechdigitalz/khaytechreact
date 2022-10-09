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
  Alert,
  Avatar,
  TextField
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
    
  const isDesktop = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { general } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = React.useState(null);
  const params = useParams();
  const trx = params.id;
  const url = '/user/airtime-convert/confirm/';
  React.useEffect(() => {
    axios.get(url+trx).then((response) => {
      setPost(response);     
    });
  }, []);
  const data = post; 
  const isNotFound = (!data );
 

  if (!data) return <SkeletonProductItem  sx={{ width: 40 }} />;

  const handlePayment = async (event, formState) => {
  const gateway = data.data.data.name;
  await new Promise((resolve) => setTimeout(resolve, 500));
  try { 
    const form = document.querySelector("form");
    axios.post('/user/process/manual-airtime',{ 
      headers: {
        "Content-Type": "multipart/form-data",
      },
      reference: data.data.data.trx,
      })
    .then(res => { 
       // Notification Starts;
       if(res.data.code === 200)
       { 
         enqueueSnackbar(res.data.message, {variant:'success'});
         navigate(`../convert/airtime/automatic`, { replace: true });
        }
        enqueueSnackbar(res.data.message, {variant:'error'}); 
         if(res.data.error.length > 0){
           for (let i = 0; i < res.data.error.length; i+=1) {
             enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
             }
         }
       // Notification Ends;
       
    })
    
     } catch (error) {
      console.error(error);
    }  

};

 
 
  const location = "assets/images/bills/";
  const png = ".jpg";
  return (
    <>

<Page title="Payment">
         <Container>
         <HeaderBreadcrumbs
          heading="Instant Conversion"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Preview Transaction' },
          ]}
          />
         
          <Grid container spacing={isDesktop ? 3 : 5}>
             
            <Grid item xs={12} md={12}>
              
            <RootStyle>
         
      <Alert severity="info">You will receive an OTP shortly, Please enter it in the field below and click on the complete 
      button to process transaction</Alert>
      <br/>
      
      <Stack spacing={2.5}>
      <Stack direction="row" justifyContent="space-between">
                    
           <Avatar alt='image' src={HOST_URL+location+data.data.data.network+png} />
          
         </Stack>

        
        <Stack direction="row" justifyContent="space-between">
          <Typography component="p" variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Transaction Number
          </Typography>
          <Label color="info" variant="filled">
          {data.data.data.trx}
          </Label>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
           Airtime Amount
          </Typography>
           <Typography variant="h5" sx={{ mx: 1 }}>
          {general.cur_sym} {fCurrency(data.data.data.amount)}
          </Typography> 
        </Stack>
 

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
           Airtime Value
          </Typography>
          <Typography variant="h6" component="p">
          {general.cur_sym}{fCurrency(data.data.data.receive)}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      <Typography variant="caption" sx={{ color: 'red', mt: 1 }}>
            * Transaction charge for this conversion is {general.cur_sym} {fCurrency(data.data.data.charge)}
          </Typography>

          <Stack spacing={3} mt={5}>
        <TextField type="password" name="pin" id="pin" fullWidth label="Airtime Share Pin" />
        <Typography variant="caption" sx={{ color: 'primary.main' }}>
        Enter OTP code sent to {data.data.data.sender}
        </Typography> 
          </Stack>
      
      <LoadingButton onClick={handlePayment} fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }}>
       Complete
      </LoadingButton> 
       

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:alert-triangle-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="caption" sx={{ color: 'primary.main', mt: 1 }}>
          Terms & Condition: {general.sitename} Fund will be automatically credited into your wallet once transaction has been completed
          </Typography>
        </Stack>
        
      </Stack>

                  
    </RootStyle>

        

            </Grid>
          </Grid>
          
        </Container>
      
     </Page>
        
    </>
  );
}
