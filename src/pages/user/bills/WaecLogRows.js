/* eslint-disable camelcase */
import {Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
 // @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack, Button  } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Avatar from '../../../components/Avatar';

import { HOST_URL } from '../../../config';
import useAuth from '../../../hooks/useAuth';

import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------

ELectricityLogRows.propTypes = {
  row: PropTypes.object.isRequired,
  onViewRow: PropTypes.func,
  selected: PropTypes.bool,
};

export default function ELectricityLogRows({ row, selected,onViewRow }) {
  const theme = useTheme();
  const { general } = useAuth();

  const { network, amount, api, type, accountname, trx, created_at, phone, status,accountnumber } = row;
  
   
  const location = "assets/images/bills/";
  const png = ".jpg";
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={network} src={HOST_URL+location+network+png} />
              <Typography variant="subtitle2">{row.name}</Typography>
          </Stack>
      </TableCell>

      <TableCell> 
     
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {network}
          </Typography>
 
        </Stack>
      </TableCell>

      <TableCell align="left">{trx} </TableCell>
      

      <TableCell align="left">{fDate(created_at)}</TableCell>
    
 
      <TableCell  >{general.cur_sym}{fCurrency(amount)}</TableCell>
      <TableCell >{phone}</TableCell>
      <TableCell >{accountnumber}</TableCell>
       

       
    </TableRow>
  );
}
