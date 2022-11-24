// @mui
import { Container, Drawer, Toolbar, ListItemButton, Grid,Box, Card, Paper,Stack, Divider,Button, CardHeader,IconButton, Typography,styled ,Link ,Alert} from '@mui/material';
// hooks
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page'; 
import { fCurrency } from '../../utils/formatNumber';
import SvgIconStyle from '../../components/SvgIconStyle';
import style from './custom.css';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { PATH_DASHBOARD } from '../../routes/paths';
import axios from '../../utils/axios';

// sections
import { 
  AppNewTRX, 
  AppDebitCredit,
  AppLoginSession, 
  InviteFriends,
  CurrentBalance, 
  Widget, 
  } from './home';

import { OrderCompleteIllustration, MaintenanceIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function Dashboard() {
  const { user,general } = useAuth();
  const { themeStretch } = useSettings();
  const HEIGHT = 206;
  const { enqueueSnackbar } = useSnackbar();
  const ContentStyle = styled(Card)(({ theme }) => ({
    marginTop: 20,
    boxShadow: 'none',
    height: HEIGHT - 16,
    padding: theme.spacing(5),
    paddingTop: theme.spacing(16),
    color: theme.palette.common.white,
    backgroundImage: `linear-gradient(135deg,
      #4B3687 0%,
      #4B3687 100%)`,
  }));
  const [showCurrency, setShowCurrency] = useState(true);
  const onToggleShowCurrency = () => {
    setShowCurrency((prev) => !prev);
  };
  const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 26, height: 26}} />;

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
 

 const GridStyle = styled(Card)(({ theme }) => ({
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 100%,
    ${theme.palette.primary.dark} 100%)`,
}));

const RowStyle = styled('div')({
  justifyContent: 'space-between',
});
const navigate = useNavigate();

const NavDeposit = () => {
  navigate(PATH_DASHBOARD.dashboard.deposit);
 };
 const NavWithdraw = () => {
   navigate(PATH_DASHBOARD.transfer.bank);
  };
  const NavBVN = () => {
    navigate(PATH_DASHBOARD.dashboard.bvn);
   };
   const NavPIN = () => {
     navigate(PATH_DASHBOARD.dashboard.security);
    };

   const NavNuban = async (event, formState) => {
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

  const NavTransfer = () => {
    navigate(PATH_DASHBOARD.transfer.transfer);
   };
   const NavAirtime = () => {
     navigate(PATH_DASHBOARD.dashboard.airtime);
    };
 const NavInternet = () => {
   navigate(PATH_DASHBOARD.dashboard.internet);
  };

  const NavBetting = () => {
    navigate(PATH_DASHBOARD.dashboard.betting);
   };
   const NavTcard = () => {
     navigate(PATH_DASHBOARD.dashboard.ecard);
    };

    const NavUtility = () => {
      navigate(PATH_DASHBOARD.dashboard.electricity);
     };
   
  
 
  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
        <Grid item xs={12}>

        <Typography  sx={{color: 'black'}}  variant="h4"> Hello, {user.username}</Typography>
        </Grid>
        {(() => {
                if (user.trxpin === null) {
                  return (
                    
          <Grid item xs={12} md={12}>
          <Alert severity="error">You have not setup your transaction PIN. Please click 
          
           <Button variant="outlined"  color="primary" sx={{color: 'primary', size: 'sm'}} 
                           onClick={NavPIN}>
                           Here
                          </Button>  to setup your pin</Alert>   
         </Grid>
           )
          }
           
        })()} 
         <Grid item xs={12} md={6}>
        {(() => {
                if (user.bvn_verify !== 1) {
                  return (
                    
                    <Card sx={{ p: 3,  backgroundImage: `linear-gradient(135deg,
                      #553E85 0%,
                      #553E85 100%)` }}>
                      
                
                      <Stack spacing={2}>
                       
                        <RowStyle>
                          <br/>
                        <center>  
                        <Alert severity="error">Bank Account Not Verified</Alert>                     
                        <Typography sx={{ typography: 'h6',color: 'white' }}><small>Click the  button below to verify your <b>Bank Account</b></small></Typography>  
                      
                      </center>
                
                         
                        </RowStyle>
                
                        
                
                        <Stack direction="row" spacing={1.5}>
                          
                          <Button fullWidth variant="outlined"  color="inherit" sx={{color: 'white'}} 
                           onClick={NavBVN}>
                            Verify BVN
                          </Button> 
                          
                        </Stack>
                        <br/>
                      </Stack>
                    </Card>
                  )
                }
                if (user.bvn_verify === 1 && user.account_number === null  ) {
                  return (
                    
                    <Card sx={{ p: 3,  backgroundImage: `linear-gradient(135deg,
                      #553E85 0%,
                      #553E85 100%)` }}>
                      
                
                      <Stack spacing={2}>
                       
                        <RowStyle>
                          <br/>
                        <center>  
                        <Alert severity="info">Virtual Bank Account Not Active Yet</Alert>                     
                        <Typography sx={{ typography: 'h6',color: 'white' }}><small>Please Click the button below to activate </small></Typography>  
                      
                      </center>
                
                         
                        </RowStyle>
                
                        
                
                        <Stack direction="row" spacing={1.5}>
                          
                          <Button fullWidth variant="outlined"  color="inherit" sx={{color: 'white'}} 
                           onClick={NavNuban}>
                            Activate NUBAN
                          </Button> 
                          
                        </Stack>
                        <br/>
                      </Stack>
                    </Card>
                  )
                }

                if (user.bvn_verify === 1) {
                  return (
                    <Card sx={{ p: 3,  backgroundImage: `linear-gradient(135deg,
                      #553E85 0%,
                      #553E85 100%)` }}>
                        <br/>  <br/>
                      <Stack >
                    <RowStyle>
        <Stack direction="row" divider={<Divider sx={{py: 4, color: 'white'}} orientation="vertical" flexItem />}>
        
            <Stack width={1} textAlign="center">
              <Typography variant="h6" sx={{color: 'white'}}>Account No.</Typography>
              <Typography variant="body2" sx={{color: 'white'}}>
              <b>  {user.account_number}</b>
              </Typography>
            </Stack>
            <Stack width={1} textAlign="center">
              <Typography variant="h6" sx={{color: 'white'}}>Bank Name</Typography>
              <Typography variant="body2" sx={{color: 'white'}}>
               <b> {user.bank_name}</b>
              </Typography>
            </Stack>
            <Stack width={1} textAlign="center">
              <Typography variant="h6" sx={{color: 'white'}}>Account Name</Typography>
              <Typography variant="body2" sx={{color: 'white'}}>
              <b> { user.account_name}</b>
              </Typography>
            </Stack>

          </Stack>      
          <br/>   
        </RowStyle>

      </Stack>
    </Card>
                  )
                }
                 
              })()} 
        
          </Grid>

          
          <Grid item xs={12} md={6}>
          <Card sx={{ p: 3,  backgroundImage: `linear-gradient(135deg,
      #553E85 0%,
      #553E85 100%)` }}>
      

      <Stack spacing={2}>
       
        <RowStyle>
          <br/>
        <center>  
        <Typography  sx={{color: 'white'}}  variant="h4"><small variant="h6"> Wallet Balance: </small></Typography>
     <Typography sx={{ typography: 'h3',color: 'white' }}>
           
      <IconButton color="inherit" onClick={onToggleShowCurrency} sx={{ opacity: 0.48 }}>
              <Iconify icon={showCurrency ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
     </IconButton>
       {general.cur_sym }{showCurrency ? '****' : fCurrency(user.balance)}</Typography>  
      
      </center>

         
        </RowStyle>

        

        <Stack direction="row" spacing={1.5}>
          <Button fullWidth variant="outlined" color="inherit" sx={{color: 'white'}} 
           onClick={NavDeposit}
          >
            Fund
          </Button>
          <Button fullWidth variant="outlined"  color="inherit" sx={{color: 'white'}} 
           onClick={NavWithdraw}
          >
            Withdraw 
          </Button>
          <Button fullWidth variant="outlined" color="inherit" sx={{color: 'white'}} 
           onClick={NavTransfer}>
            Transfer 
          </Button>
          
        </Stack>
        <br/>
      </Stack>
    </Card>
          </Grid>


          <Grid item xs={12} md={8}>
          <div className="container">

        <div className="card-body">
          <h4><b>Quick Menu</b></h4>
          <div className="menu-list">
          <div className="row">
          <Grid item xs={6} md={6}
          onClick={NavAirtime}
          >
             <GridStyle className="menu-item">
              <div className="menu-icon"><img src="/icons/cash.png" alt=""/></div>
              <div className="menu-body">
                <div className="menu-title">Airtime to cash</div>
              </div>
          </GridStyle>
          </Grid>
            <Grid item xs={6} md={6}
            onClick={NavAirtime}
            >
            <GridStyle className="menu-item">
              <div className="menu-icon"><img src="/icons/airtime.png" alt=""/></div>
              <div className="menu-body">
                <div className="menu-title">Buy Airtime</div>
              </div>
            </GridStyle>
            
            </Grid>
            <hr/>
            <Grid item xs={6} md={6}
            onClick={NavInternet}
            >
            <GridStyle className="menu-item">

              <div className="menu-icon"><img src="/icons/internet.png" alt=""/></div>
              <div className="menu-body">
                <div className="menu-title">Buy Data</div>
              </div>
            </GridStyle>
            
            </Grid>
            
            <Grid item xs={6} md={6}
            onClick={NavUtility}
            >
            <GridStyle className="menu-item">

              <div className="menu-icon"><img src="/icons/pay.png" alt=""/></div>
              <div className="menu-body">
                <div className="menu-title">Pay Bills</div>
              </div>
            </GridStyle>
           
            </Grid>
            <hr/>
            <Grid item xs={6} md={6}
            onClick={NavTcard}
            >
            <GridStyle className="menu-item">

              <div className="menu-icon"><img src="/icons/card.png" alt=""/></div>
              <div className="menu-body">
                <div className="menu-title">T Cards</div>
              </div>
            </GridStyle>
            
            </Grid>
            <Grid item xs={6} md={6}
            onClick={NavBetting}
            >
            <GridStyle className="menu-item">

              <div className="menu-icon"><img src="/images/bet9ja.png" alt=""/></div>
              <div className="menu-body">
                <div className="menu-title">Lotery & Betting</div>
              </div>
            </GridStyle>
            </Grid>
            <hr/>
            </div>
           
          </div>
        </div>
        </div>
        </Grid>
        <Grid item xs={12} md={4}>
          
        <div className="container">

<div className="card-body">
  <h4><b>Raffle Winners</b></h4>
          <GridStyle className="menu-grid">
            <center>
            <br/>
          <Typography  sx={{color: 'white'}}  variant="h6"><small> Congratulations to our <br/>raffle draw winners for this week </small></Typography>
          </center>
            <div className="grid-row">
              <div className="grid-item">
                <div className="menu-item" sx="background-color: rgb(149, 165, 166);">
                  <div className="menu-icon-container"><img src="/images/khaytech.png" alt="" className="menu-icon"/></div>
                  <div className="menu-title">Khaytech Digitalz</div>
                </div>
              </div>
              <div className="grid-item" sx="grid-row-end: span 1;">
                <div className="menu-item" sx="background-color: rgb(26, 188, 156);">
                  <div className="menu-icon-container"><img src="/images/midecoder.png" alt="" className="menu-icon"/></div>
                  <div className="menu-title">Mide Coder</div>
                </div>
              </div>
              
            </div>
          </GridStyle>
        </div>
      </div>
        </Grid>
 
          <Grid item xs={12} lg={8}>
            <AppNewTRX />
          </Grid>

          <Grid item xs={12} md={4}>
              <InviteFriends />
           </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppDebitCredit />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppLoginSession />
          </Grid>
           
 
        </Grid>
      </Container>
      
       
   


    </Page>
  );
}
