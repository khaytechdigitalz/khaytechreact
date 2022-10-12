import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState, useEffect,React, useRef } from 'react';
// @mui
import Slider from 'react-slick';

import { Link as RouterLink } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';

import { useForm } from 'react-hook-form';
import { styled, useTheme } from '@mui/material/styles';

import {
  Box,
  Card,
  Stack,
  Input,
  Button,
  Avatar,
  Link,
  Dialog,
  Typography,
  CardHeader,
  Tooltip,
  DialogTitle,
  DialogActions,
  Container, Grid,
  Slider as MuiSlider,
  Divider,
} from '@mui/material';

// utils
import { fCurrency } from '../../utils/formatNumber';
// _mock_
// components
 import useAuth from '../../hooks/useAuth';
 import { CarouselArrows } from '../../components/carousel';

import {
  SkeletonProductItem,
} from '../../components/skeleton';

import { FormProvider, RHFTextField,RHFSwitch, RHFCheckbox,RHFSelect } from '../../components/hook-form';
import axios from '../../utils/axios';
import Page from '../../components/Page';
 
import { 
  AppNewTransfer,AppNewTransferBar
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
  const carouselRef = useRef(null);
  const theme = useTheme();
  const [autoWidth, setAutoWidth] = useState(24);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectContact, setSelectContact] = useState(0);
  const [amount, setAmount] = useState(0);

  const sliderSettings = {
    dots: true,
    arrows: true,
    slidesToShow: 7,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setSelectContact(next),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };


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
  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

 
  const { user, general } = useAuth();
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios.get('/user/contacts').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 90 }} />;

  const bene = JSON.stringify(post.data.contacts);
  const benecount = JSON.parse(bene);

  const results = JSON.stringify(post.data.contacts);
  const personObject = JSON.parse(results);
  const image = post.data.image;
  const countben = benecount.length;
  const isNotFound = (!personObject.length );
  return (
    <>
 <Page title="Dashboard">
      <Container>
        <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
      <RootStyle>
        <CardHeader title="User Fund Transfer" />
        <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Beneficiaries ({countben})
            </Typography>
            <Link component={RouterLink} to="#" sx={{ typography: 'button' }}>
              View All
            </Link>
          </Stack>

          <Box sx={{ position: 'relative' }}>
            <CarouselArrows
              filled
              onPrevious={handlePrevious}
              onNext={handleNext}
              customIcon={'eva:arrow-ios-forward-fill'}
              sx={{
                '& .arrow': {
                  mt: '-14px',
                  '&.left': { left: -16 },
                  '&.right': { right: -16 },
                  '& button': { width: 28, height: 28, borderRadius: '50%', p: 0.75 },
                },
              }}
            >
              <Slider ref={carouselRef} {...sliderSettings}>
                {personObject.map((contact, index) => (
                  <Box key={contact.id} sx={{ py: 5 }}>
                    <Box sx={{ width: 40, height: 40 }}>
                      <Tooltip key={contact.id} title={contact.user.username} arrow placement="top">
                      
                        <Avatar
                          src={image+contact.user.image}
                          sx={{
                            opacity: 0.48,
                            cursor: 'pointer',
                            transition: (theme) => theme.transitions.create('all'),
                            ...(selectContact === index && {
                              opacity: 1,
                              transform: 'scale(1.25)',
                              boxShadow: '-4px 12px 24px 0 rgb(0,0,0,0.24)',
                            }),
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Slider>
            </CarouselArrows>
          </Box>
          

          <Stack spacing={3}>
         
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
       <Grid item xs={12} md={7}>
       <AppNewTransferBar />
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
  const [openConfirm, setOpenConfirm] = useState(false);


  const onSubmit = async (formState) => {
    try {
       await new Promise((resolve) => setTimeout(resolve, 500));
      axios.post('/user/usertransfer', { 
        amount: formState.amount,
        trxpin: formState.trxpin,
        mycontact: formState.mycontact,
        username: formState.username,
        save: formState.save,
       })
      .then(res => { 
         // Notification Starts;
         console.log(res)
         if(res.data.code === 200)
         { 
           enqueueSnackbar(res.data.message, {variant:'success'});
           const handleCloseConfirm = () => {
            setOpenConfirm(false);
          };
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
  const handleKeyUp = (event) => {
    const user = event.target.value;
     try {
      axios.post('/user/verifyusername', { 
       username: user,
       })
     .then(res => { 
        if(res.data.code === 401)
        {
          document.getElementById("custom-name").innerHTML = 'Invalid';
          enqueueSnackbar(res.data.message, {variant:'error'});
        }
         enqueueSnackbar(res.data.message);
         const space = ' ';
         document.getElementById("custom-name").innerHTML = res.data.data.beneficiary.firstname+space+res.data.data.beneficiary.lastname;
     })
   } catch (error) {
     console.error(error);
   }
  };
  const [show, toggleShow] = useState(true);
  
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios.get('/user/contacts').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.contacts);
  const contacts = JSON.parse(results);
  const image = post.data.image;
  const space = ' ';

  const getbeneficiary = (event) => {
    enqueueSnackbar(event.target.options[event.target.selectedIndex].dataset.fullname);
  };


  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
       <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      
     
      <DialogTitle>Transfer to:</DialogTitle>
      <Stack spacing={3} sx={{ p: 3, pb: 0 }}>
        <InputAmount
          onBlur={onBlur}
          onChange={onChange}
          autoWidth={autoWidth}
          amount={amount}
          disabled
          disableUnderline={false}
          sx={{ justifyContent: 'flex-end' }}
          />
          <RHFTextField name="amount" type="number" fullWidth label="Confirm Amount" />
          <RHFTextField name="trxpin" type="password" fullWidth  label="Transaction Pin" />
          
          
          { show ? <RHFSelect  fullWidth name="mycontact" label="Select From Beneficiary List">
                              <option selected disabled>Select Beneficiary</option>
                              {contacts.map((category) => (
                                <option data-fullname={category.user.firstname+space+category.user.lastname} data-email={category.user.email} data-username={category.user.username}  key={category.id} value={category.username}>
                                      {category.user.username}
                                </option>
                              ))}
          </RHFSelect> 
          : <RHFTextField name="username" onKeyUp={handleKeyUp} fullWidth label="Enter Recipient's Username or Email" id="username"/> }
          
        
          
          { show ? '':
             <Typography variant="body2" sx={{ color: 'primary.main' }}>
             <a id="custom-name"><small>{null}</small></a>
            </Typography>
          }
          { show ? '':
           <RHFSwitch
           name="save"
           labelPlacement="start"
           label={
             <>
               <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                 Add as beneficiary
               </Typography>
               <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                 Enabling this will automatically add this user as beneficiary for subsequent fund transfers
               </Typography>
             </>
          }
       
        sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
        />
         }
          <Divider sx={{ borderStyle: 'dashed' }} />
          <></>
        <RHFSwitch
         name="swtich" 
         onClick={() => toggleShow(!show)}
         labelPlacement="start"
         label={
           <>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
               Switch Tranasfer Beneficiary
             </Typography>
             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Toggle between adding new transfer beneficiary or
               selecting from your added beneficiary contact list.
             </Typography>
           </>
            }
            sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
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
