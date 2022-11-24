import PropTypes from 'prop-types';
import { useState } from 'react';
import Slider from 'react-slick';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Stack, MenuItem, IconButton, Button, Label } from '@mui/material';
// utils
import { useSnackbar } from 'notistack';
import { fCurrency } from '../../../utils/formatNumber';
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _bankingCreditCard } from '../../../_mock';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { CarouselDots } from '../../../components/carousel';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const HEIGHT = 276;

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const CardItemStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT - 16,
  padding: theme.spacing(3),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  backgroundImage: 'url("/images/bg_card.png")',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const shadowStyle = {
  mx: 'auto',
  width: 'calc(100% - 16px)',
  borderRadius: 2,
  position: 'absolute',
  height: 200,
  zIndex: 8,
  bottom: 8,
  left: 0,
  right: 0,
  bgcolor: 'grey.500',
  opacity: 0.32,
};

// ----------------------------------------------------------------------

export default function CurrentBalance({balance}) {
  const theme = useTheme();
  const { user } = useAuth();
  const plan = user.plans;
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 16, bottom: 16 }),
  };

  const CATEGORY_OPTION = [
    {
      "name": "Main Balance",
      "Title": "Plan Name",
      "SubTitle": plan ? plan.name : "Free",
      "ExpireTitle": "Plan Expiry",
      "ExpireDate": user.plan_expire ? fToNow(user.plan_expire) : "None",
      "balance": user.balance,
      "icon":"/icons/moneybag.png"
  },
  {
    "name": "Referal Bonus",
    "balance": user.ref_bonus,
    "icon":"/icons/round.png"
  },
  {
      "name": "Pending Balance",
      "balance": user.hold_balance,
      "icon":"/icons/timer.png"
  }
];

  return (
    <RootStyle>
      <Box sx={{ position: 'relative', zIndex: 9 }}>
        <Slider {...settings}>
          {CATEGORY_OPTION.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Slider>
      </Box>

      <Box sx={{ ...shadowStyle }} />
      <Box
        sx={{
          ...shadowStyle,
          opacity: 0.16,
          bottom: 0,
          zIndex: 7,
          width: 'calc(100% - 40px)',
        }}
      />
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

CardItem.propTypes = {
  card: PropTypes.shape({
    balance: PropTypes.number,
    name: PropTypes.string,
    icon: PropTypes.string,
    cardType: PropTypes.string,
    cardValid: PropTypes.string,
  }),
};

function CardItem({ card }) {
  const { cardType, balance,  cardHolder, icon, name,Title, SubTitle , ExpireTitle, ExpireDate} = card;
  const [showCurrency, setShowCurrency] = useState(true);
  const { user } = useAuth();
  const {general} = useAuth();
  const onToggleShowCurrency = () => {
    setShowCurrency((prev) => !prev);
  };

  return (
    <>
      <CardItemStyle>
        <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}>
          <MoreMenuButton />
        </Box>
        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2', opacity: 0.72 }}>{name}</Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ typography: 'h3' }}>{general.cur_sym }{showCurrency ? '****' : fCurrency(balance)}</Typography>
            <IconButton color="inherit" onClick={onToggleShowCurrency} sx={{ opacity: 0.48 }}>
              <Iconify icon={showCurrency ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </Stack>
        </div>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          <Image
            disabledEffect
            visibleByDefault
            alt="credit-card"
            src={icon}
            sx={{ height: 80 }}
          />
         </Stack>

        <Stack direction="row" spacing={5}>
          <div>
            <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.48 }}>{Title}</Typography>
            <Typography sx={{ typography: 'subtitle1' }}> {SubTitle}</Typography>
          </div>
          <div>
            <Typography sx={{ mb: 1, typography: 'caption', textAlign: 'right', opacity: 0.48 }}>{ExpireTitle}</Typography>
            <Typography sx={{ typography: 'subtitle1',textAlign: 'right' }}>{ExpireDate}</Typography>
          </div>
        </Stack>
      </CardItemStyle>
    </>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const generatenuban = async (event, formState) => {
    try { 
      await new Promise((resolve) => setTimeout(resolve, 500));
      const form = document.querySelector("form");
      const formData = new FormData(form);

      axios.post('/user/generate_nuban', formData,{ 
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

    } catch (error) {
      console.error(error);
    }

  }; 
  
    if (user.account_number === null) {
      return (
        <>
          <Button color="primary" 
          onClick={generatenuban} 
           variant="contained">
              Generate Nuban
          </Button>
        </>
      );
    }
    if (user.account_number !== null) {
      return (
        <>
          <Button color="primary" 
          disabled
          onClick={generatenuban} 
          variant="contained">
              Generate Nuban
          </Button>
        </>
      );
    }
     

  
}
