// @mui
import { useState,useEffect } from 'react';
import {Link as RouterLink,useParams,useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Switch, Divider, Box, Grid, Container, Typography,TextField,Stack } from '@mui/material';

import PaystackPop from '@paystack/inline-js';
import { useSnackbar } from 'notistack';

// hooks
import { LoadingButton } from '@mui/lab';
// components

import Label from '../components/Label';
import Iconify from '../components/Iconify';
import useResponsive from '../hooks/useResponsive';
import axios from '../utils/axios';
import { fDate } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';

// components
import Page from '../components/Page';
// sections
import useAuth from '../hooks/useAuth';
import {
  SkeletonProductItem,
} from '../components/skeleton';
import { HOST_URL } from '../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function PaymentLink() {
  const isDesktop = useResponsive('up', 'md');
  const [post, setPost] = useState(null);
  const { general } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const trx = params.id;
  const link = "/plinkdetails/";
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    axios.get(link+trx).then((response) => {
      setPost(response);     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const results = post.data.data.link;
  const gateway = post.data.data.key;
 
    const handlePayment = async (event, formState) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if(document.getElementById('email').value.length < 1)
    {
      enqueueSnackbar('Please enter your email', {variant:'error'});
    }
   
    // PAYSTACK OPERATION STARTS*/
     
      const verify = '/ipn/paystack';
      const verifyurl = HOST_URL+verify;
      const paystack = new PaystackPop();
      paystack.newTransaction({
       key: gateway,
       email: document.getElementById('email').value, 
       amount: results.amount*100,
    
        onSuccess: (transaction) => { 
        const message = transaction.message;
        const trans = transaction.reference;
        const refid = trx;
        enqueueSnackbar(message);
        // Post Into PLINK REQUESTS
          axios.post(link+trx,{ 
            headers: {
              "Content-Type": "multipart/form-data",
          },
          
          email: document.getElementById('email').value, 
          phone: document.getElementById('phone').value, 
          name: document.getElementById('name').value, 
          trxref: trans,
          })
        // END POST
        
        try {  
        const form = document.querySelector("form");
        axios.post('/ipn/paystack/paymentlink',{ 
          headers: {
            "Content-Type": "multipart/form-data",
          },
          "reference": trx,
          "paystacktrxref" : trans
          })

        .then(res => { 
          if(res.data.code === 200)
          {
            enqueueSnackbar(res.data.message);
            // navigate(`../deposits`, { replace: true });
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
      // PAYSTACK OPERATION ENDS*/
  
  };

  return (
    <Page title="Payment Links">
      <RootStyle>
        <Container>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" align="center" paragraph>
              Payment Link
            </Typography>
            
          </Box>

          <Grid container spacing={isDesktop ? 3 : 5}>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: 'grids',
                  gap: 5,
                  p: { md: 5 },
                  borderRadius: 2,
                  border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
                }}
              >
               <div>              
              <Typography variant="subtitle1">Payer's Details</Typography>
              <Stack spacing={3} mt={5}>
                <TextField fullWidth id="name" label="Person name" />
                <TextField fullWidth id="phone"  label="Phone number" />
                <TextField fullWidth id="email" label="Email" />
              </Stack>
              </div>
                
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
            
            <RootStyle>
            <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {results.description}<br/>
            <small>{fDate(results.created_at)}</small>
            </Typography>

            <Stack spacing={2.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
                  Payment ID
                </Typography>
                <Label color="primary" variant="filled">
                  {trx}
                </Label>
              </Stack>
  

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="p">
                  Total Amount
                </Typography>
                <Typography variant="h6" component="p">
                  {general.cur_sym} {fCurrency(results.amount)}
                </Typography>
              </Stack>

              <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
            </Stack>

            <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
              * Plus applicable taxes if any
            </Typography>

            <LoadingButton onClick={handlePayment} fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
             Make Payment
            </LoadingButton>

            <Stack alignItems="center" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
                <Typography variant="subtitle2">Secure credit card payment</Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                This is a secure 128-bit SSL encrypted payment
              </Typography>
            </Stack>
          </RootStyle>
          
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
