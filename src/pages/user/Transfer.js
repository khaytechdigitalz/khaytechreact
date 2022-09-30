import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState, useEffect,React } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';

import { useForm } from 'react-hook-form';

import { styled } from '@mui/material/styles';

import {
  Box,
  Card,
   Stack,
  Input,
  Button,
  Avatar,
  Dialog,
   Typography,
  CardHeader,
  DialogTitle,
  DialogActions,
  Container, Grid,
  Slider as MuiSlider,
} from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
// components
 import useAuth from '../../hooks/useAuth';

import { FormProvider, RHFTextField } from '../../components/hook-form';
import axios from '../../utils/axios';
import Page from '../../components/Page';

import { 
  AppNewTransfer
  } from './finance';
// ----------------------------------------------------------------------

const MIN_AMOUNT = 0;
const MAX_AMOUNT = 100000;
const STEP = 50;

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

export default function Transfer() {
 
  const [autoWidth, setAutoWidth] = useState(24);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [amount, setAmount] = useState(0);

 

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleSliderChange = (event, newValue) => {
    setAmount(newValue);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };

 
  const { user } = useAuth();
  const {general} = useAuth();


  return (
    <>
 <Page title="Dashboard">
      <Container>
        <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
      <RootStyle>
        <CardHeader title="Quick Transfer" />
        <Box sx={{ p: 3 }}>
          

          <Stack spacing={3}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Insert amount
            </Typography>

            <InputAmount onBlur={handleBlur} onChange={handleInputChange} autoWidth={autoWidth} amount={amount} />

            <MuiSlider
              value={typeof amount === 'number' ? amount : 0}
              valueLabelDisplay="auto"
              step={STEP}
              marks
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              onChange={handleSliderChange}
            />

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Your Balance
              </Typography>
              <Typography variant="subtitle1">{general.cur_sym }{fCurrency(user.balance)}</Typography>
            </Stack>

            <Button type="submit" variant="contained" size="large" disabled={amount === 0} onClick={handleOpenConfirm}>
              Transfer Now
            </Button>
          </Stack>
        </Box>

             
           
       </RootStyle>

       </Grid>
       <Grid item xs={12} md={12}>
       <AppNewTransfer />
       </Grid>
       </Grid>
      </Container>
    </Page>

      <ConfirmTransferDialog
        open={openConfirm}
        autoWidth={autoWidth}
        amount={amount}
        onClose={handleCloseConfirm}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />
    </>
  );
}

// ----------------------------------------------------------------------

InputAmount.propTypes = {
  amount: PropTypes.number,
  autoWidth: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

function InputAmount({ autoWidth, amount, onBlur, onChange, sx, ...other }) {
  const {general} = useAuth();
   return (
    <Stack direction="row" justifyContent="center" spacing={1} sx={sx}>
      
      <Typography variant="h5">{general.cur_sym }</Typography>
      <Input
        disableUnderline
        size="small"
        value={amount}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ step: STEP, min: MIN_AMOUNT, max: MAX_AMOUNT, type: 'number' }}
        sx={{
          typography: 'h3',
          '& input': {
            p: 0,
            textAlign: 'center',
            width: autoWidth,
          },
        }}
        {...other}
      />
      
    </Stack>
  );
}

// ----------------------------------------------------------------------

ConfirmTransferDialog.propTypes = {
  amount: PropTypes.number,
  autoWidth: PropTypes.any,
  contactInfo: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
  }),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

function ConfirmTransferDialog({ open, amount, autoWidth, contactInfo, onClose, onBlur, onChange }) {
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

  const { enqueueSnackbar } = useSnackbar();
 

  const onSubmit = async (formState) => {
    try {
       await new Promise((resolve) => setTimeout(resolve, 500));
      axios.post('/user/usertransfer', { 
        amount: formState.amount,
        username: formState.username,
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
  const handleKeyUp = (event) => {

    const user = event.target.value;
     try {
      axios.post('/user/verifyusername', { 
       username: user,
       })
     .then(res => { 
         enqueueSnackbar(res.data.data.beneficiary.email);
         const space = ' ';
         document.getElementById("custom-email").innerHTML = res.data.data.beneficiary.email;
         document.getElementById("custom-name").innerHTML = res.data.data.beneficiary.firstname+space+res.data.data.beneficiary.lastname;
         document.getElementById("email").value = res.data.data.beneficiary.email;


     })
   } catch (error) {
     console.error(error);
   }
  };
  

   

  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      
     
      <DialogTitle>Transfer to </DialogTitle>
      <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar src={contactInfo?.avatar} sx={{ width: 48, height: 48 }} />
          <div>
            <Typography variant="subtitle2"> <a id="custom-name">None</a></Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             <a id="custom-email"><small>None</small></a>
             
            </Typography>
          </div>
        </Stack>

        <InputAmount
          onBlur={onBlur}
          onChange={onChange}
          autoWidth={autoWidth}
          amount={amount}
          disabled
          disableUnderline={false}
          sx={{ justifyContent: 'flex-end' }}
        />
        <RHFTextField name="amount" placeholder="Confirm Amount" />
        <RHFTextField name="username" onKeyUp={handleKeyUp} fullWidth multiline rows={2} placeholder="Enter Recipient's Username" />
       </Stack>
      <DialogActions>
        <LoadingButton type="submit" variant="contained" disabled={amount === 0}  loading={isSubmitting}>
          Confirm & Transfer
        </LoadingButton>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
      </FormProvider>
      
    </Dialog>
  );
}
