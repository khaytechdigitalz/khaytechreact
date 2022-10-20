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
      { title: 'Settings', path: PATH_DASHBOARD.dashboard.account, icon:  <Iconify icon={'eva:settings-2-outline'} width={24} height={24} />  },
      { title: 'Security', path: PATH_DASHBOARD.dashboard.security, icon:  <Iconify icon={'ion:finger-print-sharp'} width={24} height={24} />  },
      { title: 'Referral', path: PATH_DASHBOARD.dashboard.referral, icon:  <Iconify icon={'dashicons:buddicons-buddypress-logo'} width={24} height={24} /> },
      { title: 'Tickets', path: PATH_DASHBOARD.dashboard.tickets, icon: ICONS.mail },

     
      // FUND TRANSFER
     {
      title: 'Verification',
      path: PATH_DASHBOARD.dashboard.root,
      icon: <Iconify icon={'dashicons:privacy'} width={24} height={24} />,
      children: [
        { title: 'KYC', path: PATH_DASHBOARD.dashboard.kyc },
        { title: 'BVN', path: PATH_DASHBOARD.dashboard.bvn },
      ],
    },
    
    ],
  },
  
{
  subheader: 'Finance',
  items: [
    { title: 'Deposit', path: PATH_DASHBOARD.dashboard.deposit, icon: <Iconify icon={'dashicons:money-alt'} width={24} height={24} />  },
    { title: 'E-Cards', path: PATH_DASHBOARD.dashboard.ecard, icon: <Iconify icon={'eva:credit-card-fill'} width={24} height={24} />  },
    { title: 'Fund Lock', path: PATH_DASHBOARD.dashboard.savings, icon:  <Iconify icon={'eva:lock-outline'} width={24} height={24} />  },
    { title: 'Request Fund', path: PATH_DASHBOARD.dashboard.requestfund, icon:  ICONS.ecommerce  },
  //  { title: 'Withdraw Fund', path: PATH_DASHBOARD.transfer.withdraw, icon: ICONS.banking   },
    { title: 'Payout', path: PATH_DASHBOARD.transfer.payout, icon: ICONS.banking   },
    
    // FUND TRANSFER
    {
      title: 'Transfer',
      path: PATH_DASHBOARD.transfer.root,
      icon: <Iconify icon={'fa6-solid:money-bill-transfer'} width={24} height={24} />,
      children: [
        { title: 'User to User', path: PATH_DASHBOARD.transfer.transfer },
        { title: 'Bank Transfer', path: PATH_DASHBOARD.transfer.bank },
      ],
    },
    // Convert Airtime TRANSFER
     {
      title: 'Airtime To Cash',
      path: PATH_DASHBOARD.transfer.root,
      icon: <Iconify icon={'uil:credit-card-search'} width={24} height={24} />,
      children: [
        { title: 'Manual Conversion', path: PATH_DASHBOARD.conversion.manual },
        { title: 'Automatic Conversion', path: PATH_DASHBOARD.conversion.automatic },
      ],
    },
    
   ],
},




  // BILLS PAYMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Bills Payment',
    items: [
      { title: 'Airtime', path: PATH_DASHBOARD.dashboard.airtime, icon:  <Iconify icon={'eva:smartphone-fill'} width={24} height={24} />  },
      { title: 'Internet', path: PATH_DASHBOARD.dashboard.internet, icon:  <Iconify icon={'eva:wifi-fill'} width={24} height={24} />  },
      { title: 'Cable TV', path: PATH_DASHBOARD.dashboard.cabletv, icon:  <Iconify icon={'eva:monitor-outline'} width={24} height={24} />  },
      { title: 'Electricity', path: PATH_DASHBOARD.dashboard.electricity, icon:  <Iconify icon={'eva:bulb-outline'} width={24} height={24} />  },
      { title: 'WAEC Pin', path: PATH_DASHBOARD.dashboard.waec, icon:  <Iconify icon={'dashicons:welcome-learn-more'} width={24} height={24} />  },
      { title: 'Sport Betting', path: PATH_DASHBOARD.dashboard.betting, icon:  <Iconify icon={'emojione:pool-8-ball'} width={24} height={24} />  },
       
    ],
  },

   
];

export default navConfig;
