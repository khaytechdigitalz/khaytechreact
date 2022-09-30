// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  home: getIcon('ic_home'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
 };

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Account',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.dashboard.dashboard, icon: ICONS.dashboard },
      { title: 'Settings', path: PATH_DASHBOARD.dashboard.account, icon: ICONS.user  },
      { title: 'Smart KYC', path: PATH_DASHBOARD.dashboard.verification, icon: <Iconify icon={'eva:shield-fill'} width={24} height={24} />  },
      { title: 'Referral System', path: PATH_DASHBOARD.dashboard.referral, icon:  ICONS.calendar  },
    ],
  },
  
{
  subheader: 'Finance',
  items: [
    { title: 'Deposit', path: PATH_DASHBOARD.dashboard.deposit, icon: <Iconify icon={'eva:credit-card-fill'} width={24} height={24} />  },
    { title: 'Fund Lock', path: PATH_DASHBOARD.dashboard.savings, icon: ICONS.analytics },
    { title: 'User Transfer', path: PATH_DASHBOARD.dashboard.transfer, icon: ICONS.ecommerce },
    { title: 'Bank Transfer', path: PATH_DASHBOARD.dashboard.payout, icon:  ICONS.banking  },
   ],
},




  // BILLS PAYMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Bills Payment',
    items: [
      { title: 'Airtime', path: PATH_DASHBOARD.dashboard.airtime, icon:  <Iconify icon={'eva:smartphone-fill'} width={24} height={24} />  },
      { title: 'Internet', path: PATH_DASHBOARD.dashboard.internet, icon:  <Iconify icon={'eva:wifi-fill'} width={24} height={24} />  },
      { title: 'Cable TV', path: PATH_DASHBOARD.dashboard.cabletv, icon:  <Iconify icon={'eva:tv-fill'} width={24} height={24} />  },
      { title: 'Electricity', path: PATH_DASHBOARD.dashboard.electricity, icon:  <Iconify icon={'eva:power-fill'} width={24} height={24} />  },
       
    ],
  },

   
];

export default navConfig;
