import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { fNumber } from '../../../utils/formatNumber';
import useAuth from '../../../hooks/useAuth';
import Image from '../../../components/Image';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
  padding: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
};

 
export default function PricingPlanCard({ card, index }) {
const {id, cost, name, status, airtime, internet, cabletv, electricity, duration } = card;
const {general, user} = useAuth();
const { enqueueSnackbar } = useSnackbar();
const plan = user.plans;
  const handleNextStep = (id) => { 
  const url="/user/upgradeplan/";
  try {
    axios.get(url+id, { 
     })
   .then(res => { 
    if(res.data.code === 200)
    {
      enqueueSnackbar(res.data.message);
      window.location.reload(false);

    }
    else
    {
      enqueueSnackbar(res.data.message, {variant:'error'}); 
    } 

   })
 } catch (error) {
   console.error(error);
 }
 

};

  return (
    <RootStyle>
      {user.plan === id && (
        <Label
          color="primary"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute',
          }}
        >
          ACTIVE PLAN
          
        </Label>
      )}

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {name}
        
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        <Typography variant="h3" sx={{ mx: 1 }}>
          {general.cur_sym}{fNumber(cost)}
        </Typography>
          <Typography
            gutterBottom
            component="span"
            variant="subtitle2"
            sx={{
              alignSelf: 'flex-end',
              color: 'text.secondary',
            }}
          >
          /  {duration} Days
          </Typography>
         
      </Box>
 

      <Box sx={{ width: 80, height: 80, mt: 3 }}>
      <Image
        visibleByDefault
        disabledEffect
        src="/icons/purse.png"
        sx={{
          width: 100,
        }}
      />
      </Box>

      <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: status ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
            <Typography variant="body2">Airtime Discount :{airtime}%</Typography>
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: status ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
            <Typography variant="body2">Internet Discount :{internet}%</Typography>
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: status ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
            <Typography variant="body2">Cable TV Discount :{cabletv}%</Typography>
          </Stack>
          <Stack
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: status ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
            <Typography variant="body2">Electricity Discount :{electricity}%</Typography>
          </Stack>
      </Stack>

      <Button onClick={() => handleNextStep(id)} fullWidth size="large" variant="contained" disabled={user.plan === id}>
       Select Plan
      </Button>
    </RootStyle>
  );
}
