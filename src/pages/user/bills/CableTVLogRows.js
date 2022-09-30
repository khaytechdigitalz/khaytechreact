/* eslint-disable camelcase */

import PropTypes from 'prop-types';
 // @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, TableCell, Typography, Stack,  } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Avatar from '../../../components/Avatar';

import { HOST_URL } from '../../../config';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

AirtimeLogRows.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
};

export default function AirtimeLogRows({ row, selected }) {
  const theme = useTheme();
  const { general } = useAuth();

  const { network, amount, plan,  trx, created_at, phone, status } = row;

   
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
      <TableCell> 
     
        <Stack>
          <Typography variant="subtitle2" noWrap>
            {plan}
          </Typography>
 
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(created_at)}</TableCell>
    
 
      <TableCell  >{general.cur_sym}{fCurrency(amount)}</TableCell>
      <TableCell >{phone}</TableCell>
      <TableCell >
      <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status !== '1' && 'error') || 'success'
          }
          sx={{ textTransform: 'capitalize' }} >
           {(() => { 
                if (status !== '1') {
                  return (
                    <div>Not Successful</div>
                  )
                } if (status === '1') {
                  return (
                    <div>Successful</div>
                  )
                }
                
                 
              })()}
        </Label>
      </TableCell>

      

       
    </TableRow>
  );
}
