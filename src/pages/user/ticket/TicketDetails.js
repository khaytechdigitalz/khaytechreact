// @mui
import { useState, useEffect, useRef,React, useMemo } from 'react';
import { useNavigate,useParams} from "react-router-dom";

import * as Yup from 'yup';
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, CardHeader, Card, Stack,TextField,  Avatar,Paper, Container} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import MyAvatar from '../../../components/MyAvatar';
import { fDate } from '../../../utils/formatTime';
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
  padding: theme.spacing(2),
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
    Message: Yup.string().required('Enter ID Numner'),
   });

  const defaultValues = useMemo(
    () => ({
        Message:  '',
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
  
  const params = useParams();
  const trx = params.id;
  
  const [post, setPost] = useState(null);
  
  const onSubmit = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);
      axios.post('/user/ticket/reply', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
        ticket: formState.ticket,
        message: formState.message, 
       })
      .then(res => { 
         // Notification Starts;
         if(res.data.code === 200)
         { 
           enqueueSnackbar(res.data.message, {variant:'success'});
           navigate('../../tickets', { replace: true });
        }
          enqueueSnackbar(res.data.message, {variant:'error'}); 
           if(res.data.error.length > 0){
             for (let i = 0; i < res.data.error.length; i+=1) {
               enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
               }
           }
         // Notification Ends;
       
      })
     //  reset();
     } catch (error) {
      console.error(error);
    }
  };

  const {general} = useAuth();

  useEffect(() => {
    axios.get(`/user/view/ticket/${trx}`).then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.message);
  const CATEGORY_OPTION = JSON.parse(results);
  const ticket = JSON.stringify(post.data.ticket);
  const TIcketOption = JSON.parse(ticket);
   
  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
       <HeaderBreadcrumbs
          heading="View Ticket"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'View Ticket' },
          ]}
          />

       
    <RootStyle>
    {CATEGORY_OPTION.map((comment) => (
         
        <Stack spacing={1.5}>
           
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar alt={TIcketOption.name} src={TIcketOption.name} />
                <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems={{ sm: 'center' }}
                    justifyContent="space-between"
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="subtitle2">{TIcketOption.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {fDate(comment.created_at)}
                    </Typography>
                  </Stack>
                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {comment.message}
                  </Typography>
                </Paper>
              </Stack>
          
          </Stack>
        
       ))}
       <br/><br/>
       
        
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <Stack spacing={2.5}>
            <input value={trx} hidden name="ticket"/>
            <RHFTextField name="message" multiline rows={2} label="Message" />
      
 
      <LoadingButton type="submit"  size="large" variant="contained" sx={{ mt: 5, mb: 3 }} loading={isSubmitting}>
              {'Reply Ticket'}
      </LoadingButton>
        </Stack>
     
      
      </FormProvider>
    </RootStyle>

</Container>
    </Page>
  );
}
