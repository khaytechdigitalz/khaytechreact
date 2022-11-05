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
  const location = "assets/images/bills/";

  const { sent, network, response, name, beneficiary, created_at, charge, status } = row;

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
      {beneficiary}
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
     

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>

          <Link noWrap variant="body2" sx={{ color: 'text.disabled', cursor: 'pointer' }}>
            
            <Avatar alt={network} src={`${HOST_URL+location+network}.jpg`} />
          </Link>
        </Stack>
      </TableCell>


      <TableCell align="left">{fDate(created_at)}</TableCell>

     
      <TableCell >
      {response}
      </TableCell>

      <TableCell align="left">
      <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 1 && 'success') ||
            (status === 0 && 'warning') ||
            (status === 2 && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
           {(() => {
                if (status === 0) {
                  return (
                    <div>Pending </div>
                  )
                }
                if (status === 1) {
                  return (
                    <div>Successful</div>
                  )
                }

                if (status === 2) {
                  return (
                    <div>Declined</div>
                  )
                }
              
              })()}
        </Label>
      </TableCell>

       
    </TableRow>
  );
}
