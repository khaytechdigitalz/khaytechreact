/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import createAvatar from '../../../utils/createAvatar';
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

PayoutLogRows.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function PayoutLogRows({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { user,general } = useAuth();
  const location = "assets/images/withdraw/method/";

  const { sent, amount, method, trx, created_at, charge, status } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
      <Image alt={method.name} src={HOST_URL+location+method.image} sx={{ width: 30, height: 30, borderRadius: 1.5, flexShrink: 0 }} />

      </TableCell>

      <TableCell>
      

        <Stack>
          <Typography variant="subtitle2" noWrap>
          {(() => {
                if (!method) {
                  return (
                    <div>None</div>
                  )
                  }
                if (method) {
                  return (
                    <div>{method.name}</div>
                  )
                }
                 
              })()}
            
          </Typography>
 
        </Stack>
      </TableCell>

      <TableCell align="left">{trx} </TableCell>
      <TableCell align="left">{fDate(created_at)}</TableCell>
    
      <TableCell align="left">{general.cur_sym}{fCurrency(charge)}</TableCell>

      <TableCell align="center">{general.cur_sym}{fCurrency(amount)}</TableCell>
      <TableCell align="center">{general.cur_sym}{fCurrency(amount - charge)}</TableCell>
      <TableCell >
      <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status !== "success" && 'error') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
           {(() => {
                if (status === "pending") {
                  return (
                    <div>Pending</div>
                  )
                } if (status === "rejected") {
                  return (
                    <div>Rejected</div>
                  )
                }
                if (status === "success") {
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
