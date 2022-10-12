// @mui
import { useState, useEffect,React,useMemo,useRef } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Divider, Typography, Stack,TextField, Box,Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
 

import Iconify from '../../../components/Iconify';
import { SentIcon } from '../../../assets';
import { PATH_AUTH } from '../../../routes/paths';

import {
  FormProvider,
   RHFSelect,
   RHFTextField,
   RHFSwitch,
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
  const pdfRef = useRef(null);
  const forminput = Yup.object().shape({
    number: Yup.string().required('Enter ID Numner'),
    expiry: Yup.string().required('ID expiry date is required'),
    issued_date: Yup.string().required('ID issued date is required'),
    type: Yup.string().required('Please select ID type'),
    image: Yup.array().min(1, 'Image is required'),
   });

  const defaultValues = useMemo(
    () => ({
      amount:  '',
    }),
    
   );

  const methods = useForm({
     defaultValues,
  });

  const {
      reset,
      handleSubmit,
    formState: { isSubmitting },
  } = methods;
 
  const [sentSuccess, sentResponse] = useState('');
  const [sent, setSent] = useState(false);

   

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
        mycontact: formState.mycontact, 
        trxpin: formState.trxpin, 
        narration: formState.narration, 
       })
      .then(res => { 
        // Notification Starts;
        if(res.data.code === 200)
        { 
          enqueueSnackbar(res.data.message, {variant:'success'});
          setSent(true);
          sentResponse(res.data.response);
          }
          enqueueSnackbar(res.data.message, {variant:'error'}); 
          if(res.data.error.length > 0){
            for (let i = 0; i < res.data.error.length; i+=1) {
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

  const [show, toggleShow] = useState(true);
  const [post, setPost] = useState(null);
  const {general} = useAuth();
  const printRef = useRef();
  const [contact, setContact] = useState(null);

   useEffect(() => {
    axios.get('/banklist').then((response) => {
      setPost(response);     
    });
  }, []);

  useEffect(() => {
    axios.get('/user/contacts').then((response) => {
      setContact(response);
      console.log(response);
    });
  }, []);

  if (!contact) return <SkeletonInputLoader  sx={{ width: 90 }} />;
  const ben = JSON.stringify(contact.data.bankcontacts);
  const contacts = JSON.parse(ben);
  
  if (!post) return <SkeletonInputLoader  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data);
  const fee = post.data.fee;
  const CATEGORY_OPTION = JSON.parse(results);
  const getgateway = async (event, formState) => {
    document.getElementById("fees").innerHTML = fee;  
    if(event.target.options[event.target.selectedIndex].dataset.contact != null)
    {
      document.getElementById("accountnumber").innerHTML = `Account Number: ${event.target.options[event.target.selectedIndex].dataset.account_number}<br/>`;
      document.getElementById("bankname").innerHTML = `Bank Name: ${event.target.options[event.target.selectedIndex].dataset.bank}`;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
      const amount = document.getElementById('amount').value;
      const account = document.getElementById('account').value;
      const code = event.target.options[event.target.selectedIndex].dataset.code;
      axios.get(`bank_account/resolve?account_number=${account}&account_bank=${code}`,{ 
        })
      .then(res => { 
        if(res.data.code === 200)
        {
          enqueueSnackbar(res.data.message);
          document.getElementById("accountholder").innerHTML = res.data.account_name;
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
   
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    // const pdf = new jsPDF();
    const pdf = jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  };

  return (
    <Page>
    <RootStyle>
     
    {!sent ? (
     <>
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
          { show ? null
          : 
           <Stack spacing={3} mt={5}>
           <TextField type="numnber" name="account_number" id="account" fullWidth label="Account Number" />
          </Stack>
            }
         
         { show ? null
          : 
        <Stack spacing={3} mt={5}>
               <RHFSelect name="account_bank" label="Bank" onChange={getgateway}>
                  <option selected disabled>Please Select Bank</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option data-code={category.code} data-contact={null} key={category.id} value={category.code}>
                          {category.name}
                    </option>
                   ))}
        </RHFSelect>
        </Stack>
          }
          
          { show ? 
           <RHFSelect fullWidth onChange={getgateway} name="mycontact" label="Select From Beneficiary List">
           <option selected disabled>Select Beneficiary</option>
           {contacts.map((category) => (
             <option data-contact='1' data-bank={category.bank_name} data-account_number={category.contact_id}  key={category.id} value={category.contact_id}>
                   {category.account_name}
             </option>
           ))}
            </RHFSelect> 
          : 
          null
          } 
           { show ? 
            <Typography variant="body2" sx={{ color: 'primary.main' }}>
              <b><a id="accountnumber"><small>{null}</small></a>
              <a id="bankname"><small>{null}</small></a></b>
           </Typography>
           :
           
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        <a id="accountholder"  name="accountholder" className="text-primary">{null}</a>
        </Typography>
          }
           { show ? null:
           <RHFSwitch
           name="save"
           labelPlacement="start"
           label={
             <>
               <Typography variant="subtitle2" sx={{ mb: 0.5, color:'red' }}>
                 Add as beneficiary
               </Typography>
               <Typography variant="body2" sx={{ color: 'red' }}>
               <small> Enabling this will automatically add this user as beneficiary for subsequent bank transfers</small>
               </Typography>
             </>
          }
       
        sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
        />
         }
         
          <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="p">
           <small> Transfer Fee</small>
          </Typography>
          <Typography variant="h6" component="p">
          <small> {general.cur_sym}<a id="fees">0.00</a></small>
          </Typography>
       
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
 
        <></>
        <RHFSwitch
         name="swtich" 
         onClick={() => toggleShow(!show)}
         labelPlacement="start"
         label={
         
           <>
           
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: 'primary.main' }}>
               Switch Tranasfer Beneficiary
             </Typography>
             <Typography variant="body2" sx={{ color: 'primary.main' }}>
              <small> Toggle between adding new transfer beneficiary or
               selecting from your added bank transfer beneficiary list.</small>
             </Typography>
           </>
            }
            sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
        <RHFTextField name="narration" multiline rows={2} label="Narration" />
       <RHFTextField name="trxpin" type="password" fullWidth  label="Transaction Pin" />
         
      </Stack>

     
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Transfer Fund'}
      </LoadingButton>
      

          

 
      </FormProvider>

      </>
            ) 
      : (

        <Box sx={{ textAlign: 'center' }} ref={printRef}> 
         <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

         <Typography variant="h4" gutterBottom>
         Transfer Successful
         </Typography>
         <Typography>
         {sentSuccess}
          </Typography>

         <Button size="small" variant="contained" onClick={handleDownloadPdf} sx={{ mt: 5 }}>
           View Receipt
         </Button>
       </Box>
    )}
    </RootStyle>
    </Page>
  );
}
