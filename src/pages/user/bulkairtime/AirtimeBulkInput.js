// @mui
/* eslint-disable no-plusplus */
/* eslint operator-assignment: ["error", "never"] */


import { useState, useEffect,React } from 'react';

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack,TextField ,Card, Grid,Box} from '@mui/material';
import { LoadingButton, StaticDatePicker } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fCurrency } from '../../../utils/formatNumber';


import {
  FormProvider,
   RHFSelect,
   RHFTextField,
  } from '../../../components/hook-form';
  import axios from '../../../utils/axios';

  import useAuth from '../../../hooks/useAuth';
  import Page from '../../../components/Page';


import {
  SkeletonProductItem,
  SkeletonInputLoader,
} from '../../../components/skeleton';

  // ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));
 
// ----------------------------------------------------------------------

export default function AirtimeInput() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const plan = user.plans;


  const UpdateUserSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
  });

  const defaultValues = {
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phone: user?.phone || '',
    country: user?.address.country || '',
    address: user?.address.address || '',
    state: user?.address.state || '',
    city: user?.address.city || '',
    zip: user?.address.zip || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (event, formState) => {
    try { 
        await new Promise((resolve) => setTimeout(resolve, 500));
        const form = document.querySelector("form");
        const formData = new FormData(form);
      
        axios.post('user/airtimebuybulk', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        mtnamount: formState.mtnamount,
        airtelamount: formState.airtelamount,
        globalcomamount: formState.globalcomamount,
        etisalatamount: formState.etisalatamount,
        phone: formState.phone, 
        pin: formState.pin, 
       })
      .then(res => { 
        // Notification Starts;
        if(res.data.code === 200)
        { 
          enqueueSnackbar(res.data.message, {variant:'success'});
         }
         enqueueSnackbar(res.data.message, {variant:'error'}); 
          if(res.data.error.length > 0){
            
            for (let i = 0; i < res.data.error.length; i++) {
              enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
              }
          }
        // Notification Ends;
      })
     // reset();
     } catch (error) {
      console.error(error);
    }
  };


   
  const [post, setPost] = useState(null);

  const [mtnnetwork, GETMTN] = useState(0);
  const [airtelnetwork, GETAIRTEL] = useState(0);
  const [globacomnetwork, GETGLOBACOM] = useState(0);
  const [etisalatnetwork, GETETISALAT] = useState(0);
  const [mtncashback, MTNCAHSBACK] = useState(0);
  const [mtntotal, MTNTOTAL] = useState(0);
  const [airtelcashback, AIRTELCAHSBACK] = useState(0);
  const [airteltotal, AIRTELTOTAL] = useState(0);
  const [globacomcashback, GLOBACOMCAHSBACK] = useState(0);
  const [globacomtotal, GLOBACOMTOTAL] = useState(0);
  const [etisalatcashback, ETISALATCASHBACK] = useState(0);
  const [etisalattotal, ETISALATTOTAL] = useState(0);

  const {general} = useAuth();

  useEffect(() => {
    axios.get('/networks').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.phone);
  const discounted = JSON.stringify(post.data.data.airtimediscount);
  const CATEGORY_OPTION = JSON.parse(results);
  const DISCOUNT = JSON.parse(discounted);
  
  const getnetworks = (event) => {
    try {

      const phone = event.target.value;
      const strArray = phone.split(",");
      console.log(strArray);
       let mtn = 0;
       let globacom = 0;
       let etisalat = 0;
       let airtel = 0;
       let network = null;
      
       for(let i = 0; i < strArray.length; i++)
      {
        const prefix = strArray[i].substr(0,4);
        const count = strArray[i].length;
          // MTM SWITCH
          if(prefix  === '0803')
          {
              network = 'mtn';
              
                 if(count === 11)
              {
                mtn = mtn + 1;
              }
            
              
          }
          if(prefix  === '0806')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0814')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0810')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0813')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0816')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0703')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0706')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0903')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
          if(prefix  === '0906')
          {
              network = 'mtn';
               if(count === 11)
              {
                mtn = mtn + 1;
              }
          }
         
          // ETISALAT SWITCH
          if(prefix  === '0809')
          {
              network = 'etisalat';
               if(count === 11)
              {
                etisalat = etisalat + 1;
              }
          }
          if(prefix  === '0817')
          {
              network = 'etisalat';
               if(count === 11)
              {
                etisalat = etisalat + 1;
              }
          }
          if(prefix  === '0818')
          {
              network = 'etisalat';
               if(count === 11)
              {
                etisalat = etisalat + 1;
              }
          }
          if(prefix  === '0908')
          {
              network = 'etisalat';
               if(count === 11)
              {
                etisalat = etisalat + 1;
              }
          }
          if(prefix  === '0909')
          {
              network = 'etisalat';
               if(count === 11)
              {
                etisalat = etisalat + 1;
              }
          }
          
          // GLOBACOM SWITCH
          if(prefix  === '0805')
          {
              network = 'glo';
               if(count === 11)
              {
                globacom = globacom + 1;
              }
          }
          if(prefix  === '0807')
          {
              network = 'glo';
               if(count === 11)
              {
                globacom = globacom + 1;
              }
          }
          if(prefix  === '08011')
          {
              network = 'glo';
               if(count === 11)
              {
                globacom = globacom + 1;
              }
          }
          if(prefix  === '0815')
          {
              network = 'glo';
               if(count === 11)
              {
                globacom = globacom + 1;
              }
          }
          if(prefix  === '07015')
          {
              network = 'glo';
               if(count === 11)
              {
                globacom = globacom + 1;
              }
          }
          if(prefix  === '0905')
          {
              network = 'glo';
               if(count === 11)
              {
                globacom = globacom + 1;
              }
          }
          // AIRTEL SWITCH
          if(prefix  === '0802')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0808')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0812')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0708')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0701')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0902')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0901')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          if(prefix  === '0907')
          {
              network = 'airtel';
               if(count === 11)
              {
                airtel = airtel + 1;
              }
          }
          else
          {
              network = "unknown";
          }
          // END FOREACH
      }
      // console.log(mtn);
      
      const mtnnetwork = GETMTN(mtn);
      const airtelnetwork = GETAIRTEL(airtel);
      const globacomnetwork = GETGLOBACOM(globacom);
      const etisalatnetwork = GETETISALAT(etisalat);
     } catch (error) {
      console.error(error);
    }
  }; 
  const getmtncashback = (e) => {
    try {
     const DISCOUNT = plan ? plan.airtime : 0;
     const amount = e.target.value*mtnnetwork;
     const discount = DISCOUNT/100*amount;
     const mtntotal = MTNTOTAL(amount); 
     const mtncashback = MTNCAHSBACK(discount); 
     } catch (error) {
      console.error(error);
    }
  };  

  const getairtelcashback = (e) => {
    try {
     const DISCOUNT = plan ? plan.airtime : 0;
     const amount = e.target.value*airtelnetwork;
     const discount = DISCOUNT/100*amount;
     const airteltotal = AIRTELTOTAL(amount); 
     const airtelcashback = AIRTELCAHSBACK(discount); 
     } catch (error) {
      console.error(error);
    }
  };  

  const getglobacomcashback = (e) => {
    try {
     const DISCOUNT = plan ? plan.airtime : 0;
     const amount = e.target.value*globacomnetwork;
     const discount = DISCOUNT/100*amount;
     const globacomtotal = GLOBACOMTOTAL(amount); 
     const globacomcashback = GLOBACOMCAHSBACK(discount); 
     } catch (error) {
      console.error(error);
    }
  };  

  const getetisalatcashback = (e) => {
    try {
     const DISCOUNT = plan ? plan.airtime : 0;
     const amount = e.target.value*etisalatnetwork;
     const discount = DISCOUNT/100*amount;
     const etisalattotal = ETISALATTOTAL(amount); 
     const etisalatcashback = ETISALATCASHBACK(discount); 
     } catch (error) {
      console.error(error);
    }
  };  
 
 
 
  if (!CATEGORY_OPTION) return <SkeletonProductItem  sx={{ width: 40 }} />;
  
  
  return (
    <Page> 
    <RootStyle>

    <Divider />

    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
        <Typography sx={{ mb: 1, typography: 'body2', color: 'orange' }}>MTN</Typography>
        <Typography sx={{ typography: 'h4',color: 'orange' }}>{mtnnetwork}</Typography>
      </Box>

      <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
        <Typography sx={{ mb: 1, typography: 'body2', color: 'green' }}>GLO</Typography>
        <Typography sx={{ typography: 'h4',color: 'green' }}>{globacomnetwork}</Typography>
      </Box>
      <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
        <Typography sx={{ mb: 1, typography: 'body2', color: 'red' }}>AIRTEL</Typography>
        <Typography sx={{ typography: 'h4',color: 'red' }}>{airtelnetwork}</Typography>
      </Box>
      <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
        <Typography sx={{ mb: 1, typography: 'body2', color: 'grey' }}>9MOBILE</Typography>
        <Typography sx={{ typography: 'h4',color: 'grey' }}>{etisalatnetwork}</Typography>
      </Box>
    </Stack>
    <a id="mynum">{null}</a>

    <Divider />

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
       
        <Stack spacing={3} mt={5}>
        <TextField type="tel" name="phone" placeholder="Separate Multiple Numbers With Comma"  onKeyUp={getnetworks}  id="phone" fullWidth label="Enter Phone Numbers" />
          </Stack>

          <center>OR</center>

          <Stack spacing={3} mt={5}>
          <RHFTextField
                 label="Upload Phone Numbers"
                  name="file"
                  accept="doc/*"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                     type: 'file',
                  }}
                />
          </Stack>
        
        <Divider sx={{ borderStyle: 'dashed' }} />
         
      </Stack>
      {(() => {
                if (mtnnetwork > 0) {
                  return (
                    <Card sx={{ p: 3 }}>
                     <Stack >
                      <RHFTextField
                        name="mtnamount"
                        label="MTN AMOUNT"
                        type="number"
                        placeholder={`${general.cur_sym} 0.00`}
                        onKeyUp={getmtncashback}
                      />
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                            Total Amount
                          </Typography>
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                          {general.cur_sym}{fCurrency(mtntotal)}
                          </Typography>
                        </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                              Total Cashback
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(mtncashback)}
                            </Typography>
                          </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                              Total Payable
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(mtntotal-mtncashback)}
                            </Typography>
                          </Stack>           
                  
                    </Stack>
                    </Card>
                  )
                }
                 
      })()}
  
      {(() => {

                if (airtelnetwork > 0) {
                  return (
                    <Card sx={{ p: 3 }}>
                    <Stack>
                      <RHFTextField
                        name="airtelamount"
                        label="AIRTEL AMOUNT"
                        placeholder="0.00"
                        onKeyUp={getairtelcashback}
                      />
                       <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                            Total Amount
                          </Typography>
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                          {general.cur_sym}{fCurrency(airteltotal)}
                          </Typography>
                        </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                              Total Cashback
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(airtelcashback)}
                            </Typography>
                          </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                              Total Payable
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(airteltotal-airtelcashback)}
                            </Typography>
                          </Stack>  
                    </Stack>
                    </Card>
                  )
                }
              })()}
              {(() => {
                if (globacomnetwork > 0) {
                  return (
                    <Card sx={{ p: 3 }}>
                    <Stack>
                      <RHFTextField
                        name="globalcomamount"
                        label="GLOBACOM AMOUNT"
                        placeholder="0.00"
                        onKeyUp={getglobacomcashback}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                            Total Amount
                          </Typography>
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                          {general.cur_sym}{fCurrency(globacomtotal)}
                          </Typography>
                        </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                              Total Cashback
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(globacomcashback)}
                            </Typography>
                          </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                              Total Payable
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(globacomtotal-globacomcashback)}
                            </Typography>
                          </Stack>      
                    </Card>
                  )
                }
              })()}
              {(() => {
                if (etisalatnetwork > 0) {
                  return (
                    <Card sx={{ p: 3 }}>
                    <Stack>
                      <RHFTextField
                        name="etisalatamount"
                        label="ETISALAT AMOUNT"
                        placeholder="0.00"
                        onKeyUp={getetisalatcashback}
                      />
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                            Total Amount
                          </Typography>
                          <Typography variant="h6" component="p"  sx={{ color: 'info.main', mt: 1 }}>
                          {general.cur_sym}{fCurrency(etisalattotal)}
                          </Typography>
                        </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                              Total Cashback
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'success.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(etisalatcashback)}
                            </Typography>
                          </Stack>   
                           <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                              Total Payable
                            </Typography>
                            <Typography variant="h6" component="p"  sx={{ color: 'primary.main', mt: 1 }}>
                            {general.cur_sym}{fCurrency(etisalattotal-etisalatcashback)}
                            </Typography>
                          </Stack>   
                    </Card>
                  )
                }
              })()}
        
        <Stack spacing={3} mt={5}>
        <TextField type="number" name="pin" id="pin" fullWidth label="Transaction Pin" />
          </Stack>
        
       
                 
      
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Process'}
              <Typography variant="subtitle2" component="p" sx={{ color: 'text.white' }}>
              {null}
              </Typography>  
      </LoadingButton>
      </FormProvider>
     
    </RootStyle>

   
    </Page>
  );
}
