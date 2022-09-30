/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Avatar from '../../../components/Avatar';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import Image from '../../../components/Image';

import { HOST_URL } from '../../../config';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

AirtimeLogRows.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function AirtimeLogRows({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { user,general } = useAuth();

  const { network, amount, trx, created_at, phone, status } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
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
