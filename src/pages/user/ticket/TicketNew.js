// @mui
import { useState, useEffect, useRef,React, useMemo } from 'react';
import { useNavigate} from "react-router-dom";

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, Stack,TextField,   Container} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';

import {
  FormProvider,
   RHFSelect,
   RHFTextField,
  } from '../../../components/hook-form';
  import axios from '../../../utils/axios';

  import { fCurrency } from '../../../utils/formatNumber';
  import useAuth from '../../../hooks/useAuth';
  import Page from '../../../components/Page';

  // ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));




 

// ----------------------------------------------------------------------

export default function PaymentSummary() {
   const { enqueueSnackbar } = useSnackbar();
   const { themeStretch } = useSettings();

   const [showecard, toggleEcard] = useState(false);
   const [showothers, toggleOthers] = useState(true);
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
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  

  const navigate = useNavigate();
  
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
      axios.post('/user/ticket/create', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        desk: formState.desk,
        subject: formState.subject,
        message: formState.message, 
       })
      .then(res => { 
         // Notification Starts;
         if(res.data.code === 200)
         { 
           enqueueSnackbar(res.data.message, {variant:'success'});
           navigate('../tickets', { replace: true });
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

   
  const [post, setPost] = useState(null);
  const {general} = useAuth();

  useEffect(() => {
    axios.get('/supporttopics').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.data.topics);
  const CATEGORY_OPTION = JSON.parse(results);
   
  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
       <HeaderBreadcrumbs
          heading="Create Ticket"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Create Ticket' },
          ]}
          />
    <RootStyle>
   
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" component="p" sx={{ color: 'text.secondary' }}>
            Create New Ticket
          </Typography>
        </Stack>
        <Stack spacing={3} mt={5}>
        <RHFSelect name="desk" label="Support Desk">
                  <option selected disabled>Select Option</option>
                  {CATEGORY_OPTION.map((category) => (
                    <option key={category.id} value={category.name}>
                          {category.name}
                    </option>
                   ))}
         </RHFSelect>

        </Stack> 
        
           <Stack spacing={3} mt={5}>
           <TextField type="text" name="subject" id="subject" fullWidth label="Subject" />
           <RHFTextField name="message" multiline rows={4} label="Message" />
          </Stack>
           
        

        <Divider sx={{ borderStyle: 'dashed' }} />
          
      </Stack>
 
 
      <LoadingButton type="submit"  fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Create Ticket Now'}
      </LoadingButton>
 
     
      
      </FormProvider>
    </RootStyle>

</Container>
    </Page>
  );
}
