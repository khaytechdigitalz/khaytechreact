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

SavingsLogRows.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function SavingsLogRows({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { user,general } = useAuth();

  const { plan, amount, trx, created_at, total_interest, status } = row;

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
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell> 
     
        <Stack>
          <Typography variant="subtitle2" noWrap>
          {(() => {
                if (!plan) {
                  return (
                    <div>None</div>
                  )
                  }
                if (plan) {
                  return (
                    <div>{plan.name}</div>
                  )
                }
                 
              })()}
          </Typography>
 
        </Stack>
      </TableCell>

      <TableCell align="left">{trx} </TableCell>
      <TableCell align="left">{fDate(created_at)}</TableCell>
    
 
      <TableCell  >{general.cur_sym}{fCurrency(amount)}</TableCell>
      <TableCell >{general.cur_sym}{fCurrency(total_interest )}</TableCell>
      <TableCell >
      <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status !== "Completed" && 'error') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
           {(() => {
                if (status !== "Completed") {
                  return (
                    <div>{status}</div>
                  )
                } if (status === "Completed") {
                  return (
                    <div>{status}</div>
                  )
                }
                if (status === "success") {
                  return (
                    <div>{status}</div>
                  )
                }
                 
              })()}
        </Label>
      </TableCell>

      

       
    </TableRow>
  );
}
