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
  Alert,
} from '@mui/material';
// utils
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';

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
import { FormProvider, RHFTextField,RHFSwitch, RHFCheckbox,RHFSelect } from '../../../components/hook-form';


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
 
 
const defaultValues = {
  amount: '', 
}; 
const methods = useForm({
  defaultValues,
});

const {
  reset,
  handleSubmit,
  formState: { isSubmitting },
} = methods;
 

  if (!data) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const inputform = JSON.stringify(data);
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

   
    // ECARD OPERATION STARTS*/
    if(gateway === 'Ecard')
    {
      try { 
        const pan = document.getElementById("cardnumber").value;
        const pin = document.getElementById("cardpin").value;
        axios.post('/ipn/charge/ecard',{ 
          headers: {
            "Content-Type": "multipart/form-data",
          },
          reference: data.data.data.ref,
          cardnumber: pan,
          cardpin: pin,
          })
        .then(res => { 
        // Notification Starts;
         if(res.data.code === 200)
         { 
           enqueueSnackbar(res.data.message, {variant:'success'});
           navigate(`../deposits`, { replace: true });
          }
          enqueueSnackbar(res.data.message, {variant:'error'}); 
           if(res.data.error.length > 0){
             for (let i = 0; i < res.data.error.length; i+=1) {
               enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
               }
           }
         // Notification Ends;
        })
        reset();
        } catch (error) {
          console.error(error);
        }
    }
   // ECARD OPERATION ENDS*/
    // IRTIMEMANUAL OPERATION STARTS*/
    if(gateway === 'AirtimeManual')
    {
      try { 
        const senderphone = document.getElementById("sender").value;
        const receiverphone = document.getElementById("receiver").value;
        const provider = document.getElementById("network").value;
        axios.post('/ipn/airtimemanual',{ 
          headers: {
            "Content-Type": "multipart/form-data",
          },
          reference: data.data.data.ref,
          sender: senderphone,
          receiver: receiverphone,
          network: provider,
          })
        .then(res => { 
        // Notification Starts;
         if(res.data.code === 200)
         { 
           enqueueSnackbar(res.data.message, {variant:'success'});
           navigate(`../deposits`, { replace: true });
          }
          enqueueSnackbar(res.data.message, {variant:'error'}); 
           if(res.data.error.length > 0){
             for (let i = 0; i < res.data.error.length; i+=1) {
               enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
               }
           }
         // Notification Ends;
        })
        reset();
        } catch (error) {
          console.error(error);
        }
    }
   // IRTIMEMANUAL OPERATION ENDS*/
   

};
  const getnetworks = (event) => { 
  const provider = event.target.options[event.target.selectedIndex].dataset.network;
  try { 
    document.getElementById("phonenumber").innerHTML = "*******";

    document.getElementById("receiver").value = null;

    document.getElementById("network").value = null;
    document.getElementById("info").innerHTML = `Please select your prefered Network service provider and enter the phone number you will be sending the Airtime from. Please make airtime transfer to the generated phone number. You account will be credited with the airtime value once payment has been confirmed on our server.`;

    axios.post('/ipn/getphone',{ 
      headers: {
        "Content-Type": "multipart/form-data",
      },
      network: provider
      })
    .then(res => { 
    // Notification Starts;
     if(res.data.code === 200)
     { 
       enqueueSnackbar(res.data.message, {variant:'success'});
       document.getElementById("phonenumber").innerHTML = `${res.data.phone}`;
       document.getElementById("receiver").value = res.data.phone;
       document.getElementById("info").innerHTML = `${res.data.info}`;
       document.getElementById("network").value = provider;

      }
  
      enqueueSnackbar(res.data.message, {variant:'error'}); 
       if(res.data.error.length > 0){
         for (let i = 0; i < res.data.error.length; i+=1) {
           enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
           }
       }
     // Notification Ends;
    })
    reset();
    } catch (error) {
      console.error(error);
    }
  
  }; 
  const NETWORK_OPTION = [
    {
      "name": "Airtel",
      "symbol": "airtel"
  },
  {
      "name": "Globacom",
      "symbol": "glo"
  },
  {
      "name": "MTN",
      "symbol": "mtn"
  },
  {
      "name": "9mobile",
      "symbol": "9mobile"
  }
]; 
  
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
            Total Amount
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

      {(() => {
                if (data.data.data.name === 'Ecard') {
                  return (
                    <FormProvider methods={methods} >
       
                    <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
                      
                        <RHFTextField name="card" id="cardnumber" type="number" fullWidth label="Card Number" />
                        <RHFTextField name="trxpin" id="cardpin" type="password" fullWidth  label="Card Pin" />
                        
                     </Stack>
                     </FormProvider>
                  )
                }

                if (data.data.data.name === 'AirtimeManual') {
                  return (
                    <FormProvider methods={methods} >
       
                    <Stack spacing={3} >
                        <Alert severity="info"  id="info">Please select your prefered Network service provider and enter the phone number you will be sending the Airtime from. Please make airtime transfer to the generated 
                        phone number. You account will be credited with the airtime value once payment has been confirmed on our server.</Alert>
                        <RHFTextField name="phone" id="sender" type="number" fullWidth label="Phone Number" />
                        
                        <RHFSelect onChange={getnetworks}  name="network" label="Internet Plans">
                              <option selected disabled>Select Network</option>
                              {NETWORK_OPTION.map((category) => (
                                <option  data-network={category.symbol}  key={category.id} value={category.network}>
                                      {category.name}
                                </option>
                              ))}
                        </RHFSelect>
                        
                        <Divider sx={{ borderStyle: 'dashed' }} />

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" component="p">
                          Phone Number
                        </Typography>
                        <Typography variant="h6" component="p">
                        <a id="phonenumber">*******</a>
                        <input id="receiver" hidden/>
                        <input id="network" hidden />
                        </Typography>
                        </Stack>
                        
                     </Stack>
                     </FormProvider>
                  )
                }
            
       })()}

    
       
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
