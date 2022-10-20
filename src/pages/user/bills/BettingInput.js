import sum from 'lodash/sum';
import { Link as RouterLink,useNavigate,useParams } from 'react-router-dom';

// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from '../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyUsername,
  increaseQuantity,
  decreaseQuantity,
  GetTotal,
  GetUsername,
} from '../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
//
import BettingSummary from './BettingSummary';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.product);

  const { cart, total, discount, subtotal, gettotal, getusername } = checkout;

  const params = useParams();
  const company = params.id;
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    try {
      axios.post('/user/buybetting', { 
        username: getusername,
        amount: gettotal,
        provider: company,
       })
     .then(res => { 

      if(res.data.code === 200)
      {
        enqueueSnackbar(res.data.message);
        dispatch(applyUsername(null));
      }
      else
      {
        enqueueSnackbar(res.data.customer, {variant:'error'}); 
        if(res.data.error.length > 0){
          for (let i = 0; i < res.data.error.length; i+=1) {
            enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
            }
        }
        // dispatch(applyUsername(null));
      } 

     })
   } catch (error) {
     console.error(error);
     document.getElementById("customer").innerHTML = "Invalid Number";
   }

  };

 // dispatch(GetTotal(null));
//  dispatch(applyUsername(null));

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };


  const handleGetTotal = (amount) => {
    dispatch(GetTotal(amount));
  };


  const handleApplyUsername = (value) => {
    dispatch(GetUsername(value));
    try {
      dispatch(applyUsername(null));
      axios.post('/user/validatebetting', { 
        username: value,
        provider: company,
       })
     .then(res => { 

      if(res.data.code === 200)
      {
        enqueueSnackbar(res.data.message);
        dispatch(applyUsername(res.data.customer));
      }
      else
      {
        enqueueSnackbar(res.data.customer, {variant:'error'}); 
        if(res.data.error.length > 0){
          for (let i = 0; i < res.data.error.length; i+=1) {
            enqueueSnackbar(res.data.error[i], {variant:'warning'}); 
            }
        }
        dispatch(applyUsername(null));
      } 

     })
   } catch (error) {
     console.error(error);
     document.getElementById("customer").innerHTML = "Invalid Number";
   }

  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ mb: 3 }}>
            <EmptyContent
              title={company}
              width="60"
               img={`/images/${company}.png`}
            />
        </Card>

        <Button
          color="inherit"
          component={RouterLink}
          to={PATH_DASHBOARD.dashboard.betting}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          Back to Betting List        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <BettingSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyUsername={handleApplyUsername}
          onGetTotal={handleGetTotal}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!discount}
          onClick={handleNextStep}
        >
          Fund Account
        </Button>
      </Grid>
    </Grid>
  );
}
