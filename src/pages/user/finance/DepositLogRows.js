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

DepositLogRows.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function DepositLogRows({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { user,general } = useAuth();
  const location = "assets/images/gateway/";

  const { sent, amount, gateway, trx, created_at, charge, status } = row;

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
      <Image alt={gateway ? gateway.name : null} src={HOST_URL+location+gateway ? gateway.image : null} sx={{ width: 30, height: 30, borderRadius: 1.5, flexShrink: 0 }} />

      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
     

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {gateway ? gateway.name : null}
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {trx}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{fDate(created_at)}</TableCell>

      <TableCell align="left">{general.cur_sym}{fCurrency(amount)}</TableCell>

      <TableCell align="center">{general.cur_sym}{fCurrency(charge)}</TableCell>
 

      <TableCell align="left">
      <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status !== '1' && 'error') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
           {(() => {
                if (status !== '1') {
                  return (
                    <div>Incomplete</div>
                  )
                }
                if (status === '1') {
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
