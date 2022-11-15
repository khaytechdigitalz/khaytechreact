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

  const { sent, subject, name, ticket, created_at, charge, status } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell >
      {ticket}
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
     

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>

          <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            {subject}
          </Link>
        </Stack>
      </TableCell>

      <TableCell align="left">{created_at ? fDate(created_at) : ''}</TableCell>

     

      <TableCell align="left">
      <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status !== 3 && 'error') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
           {(() => {
                if (status === 0) {
                  return (
                    <div>Open </div>
                  )
                }
                if (status === 1) {
                  return (
                    <div>Answered</div>
                  )
                }

                if (status === 2) {
                  return (
                    <div>Replied</div>
                  )
                }
                if (status === 3) {
                  return (
                    <div>Closed</div>
                  )
                }
                 
              })()}
        </Label>
      </TableCell>

       
    </TableRow>
  );
}
