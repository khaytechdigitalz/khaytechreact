// @mui
import { useState, useEffect,React,useMemo } from 'react';

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Iconify from '../../../components/Iconify';

import {
  FormProvider,
   RHFSelect,
   RHFTextField,
  } from '../../../components/hook-form';
  import axios from '../../../utils/axios';

  import { fCurrency } from '../../../utils/formatNumber';
  import useAuth from '../../../hooks/useAuth';
  import Page from '../../../components/Page';


  import {
    SkeletonInputLoader,
  } from '../../../components/skeleton';
  
  // ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));


// ----------------------------------------------------------------------

export default function PaymentSummary() {
  const { enqueueSnackbar } = useSnackbar();

  const forminput = Yup.object().shape({
    number: Yup.string().required('Enter ID Numner'),
    expiry: Yup.string().required('ID expiry date is required'),
    issued_date: Yup.string().required('ID issued date is required'),
    type: Yup.string().required('Please select ID type'),
    image: Yup.array().min(1, 'Image is required'),
   });

  const defaultValues = useMemo(
    () => ({
      name:  '',
    }),
    
   );

  const methods = useForm({
     defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
       reset(defaultValues);
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/user/bank/transfer', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        amount: formState.amount,
        account_name: formState.account_name,
        account_bank: formState.bank_code, 
        account_number: formState.account_number, 
       })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
        }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }
       
      })
      reset();
     } catch (error) {
      console.error(error);
    }
  };

   
  const [post, setPost] = useState(null);
  const {general} = useAuth();

  useEffect(() => {
    axios.get('/banklist').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonInputLoader  sx={{ width: 40 }} />;
 
  const results = JSON.stringify(post.data.data);
  const CATEGORY_OPTION = JSON.parse(results);
  const getgateway = async (event, formState) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
      const amount = document.getElementById('amount').value;
      const account = document.getElementById('account').value;
      const code = event.target.options[event.target.selectedIndex].dataset.code;
      document.getElementById("fees").innerHTML = 10;  
      axios.get(`bank_account/resolve?account_number=${account}&account_bank=${code}`,{ 
        })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          document.getElementById("accountholder").innerHTML = res.data.account_name;
          document.getElementById("accountname").value = res.data.account_name;
        }
        else
        {
          enqueueSnackbar(res.data.message, {variant:'error'});
        }
       
      })
      reset();    
    
     } catch (error) {
      console.error(error);
    }
  }; 
 
 
 
  
  
  return (
    <Page>
    <RootStyle>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
     
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Bank Transfer  
          </Typography>
        </Stack>

        <Stack spacing={3} mt={5}>
        <TextField type="number" name="amount" id="amount" onKeyUp={getgateway} fullWidth label="Amount" />
          </Stack>

        <Stack spacing={3} mt={5}>
        <TextField type="numnber" name="account_number" id="account" fullWidth label="Account Number" />
          </Stack>
        <input id="accountname" hidden name="account_name"/>
        <Stack spacing={3} mt={5}>
               <RHFSelect name="account_bank" label="Bank" onChange={getgateway}>
                  <option selected disabled>Please Select Bank</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option data-code={category.code} key={category.id} value={category.code}>
                          {category.name}
                    </option>
                   ))}
                </RHFSelect>

        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
       <a id="accountholder"  name="accountholder" className="text-primary">{null}</a>
      </Typography>



         
          
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
           <small> Payout Fee</small>
          </Typography>
          <Typography variant="h6" component="p">
          <small> {general.cur_sym}<a id="fees">0.00</a></small>
          </Typography>
        
        </Stack>
        

        <Divider sx={{ borderStyle: 'dashed' }} />
 
     
        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

     
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Request Payout'}
      </LoadingButton>
 
     
      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Iconify icon={'eva:shield-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure online payment</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
      </FormProvider>
    </RootStyle>
    </Page>
  );
}
