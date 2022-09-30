import PropTypes from 'prop-types';
// @mui
import { Tooltip, IconButton, Typography,Card, Stack, InputAdornment, Button } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

DepositFilter.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function DepositFilter({ filterName, onFilterName }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5, px: 3 }}>
      <Typography>
      <h2> Deposit Log</h2>
      </Typography>
             
      <Tooltip title="Filter list">
      <Button
              variant="contained"
              startIcon={<Iconify icon="eva:printer-fill" />}
              >
              Print Report
            </Button>
      </Tooltip>
    </Stack>
  );
}
