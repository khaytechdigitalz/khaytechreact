import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui

import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer,Card,Link } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Scrollbar from '../../../components/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
//
import navConfig from './NavConfig';
import NavbarDocs from './NavbarDocs';
import NavbarAccount from './NavbarAccount';
import CollapseButton from './CollapseButton';

import styles0 from './assets/vendor/css/all.min.css';
import styles1 from './assets/vendor/flaticon/flaticon.css';
import styles2 from './assets/vendor/css/nice-select.css';
import styles3 from './assets/vendor/css/flags.css';
import styles4 from './assets/vendor/css/slick.css';
import styles5 from './assets/vendor/css/bootstrap.min.css';
import styles7  from './assets/css/style.css';
// ----------------------------------------------------------------------
  

export default function Footer() {
  

 const FooterStyle = styled(Card)(({ theme }) => ({
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
}));

  return (
    <div className="mobile-menu d-lg-none d-block">
         <ul className="mobile-nav">
            <li><Link component={RouterLink} to="internet"  className="m-nav-link"><i className="fa-light fa-wifi">{null}</i></Link></li>
            <li><Link component={RouterLink} to="home"  className="m-nav-link"><i className="fa-light fa-cart-shopping">{null}</i></Link></li>          
              <FooterStyle>
              <li>
              <Link  component={RouterLink} to="home" className="centers m-nav-link"><b><i className="text-white fa-light fa-house">{null}</i></b></Link>
              </li>
              </FooterStyle>
            <li><Link component={RouterLink} to="settings" className="m-nav-link"><i className="fa-light fa-gear">{null}</i></Link></li>
            <li><Link component={RouterLink} to="airtime" className="m-nav-link"><i className="fa-light fa-phone">{null}</i></Link></li>
         </ul>
    </div>
  );
}
