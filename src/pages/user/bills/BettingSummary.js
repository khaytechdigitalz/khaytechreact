import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

BettingSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.string,
  gettotal: PropTypes.string,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyUsername: PropTypes.func,
  onGetTotal: PropTypes.func,
  enableDiscount: PropTypes.bool,
};

export default function BettingSummary({
  total,
  onEdit,
  discount,
  gettotal,
  subtotal,
  shipping,
  onApplyUsername,
  onGetTotal,
  enableEdit = false,
  enableDiscount = false,
}) {
    return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Summary"
      />

      <CardContent>
        <Stack spacing={2}>
           
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Customer Name
            </Typography>
            <Typography variant="subtitle2">{discount}</Typography>
          </Stack>
 

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(gettotal)}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>

             <TextField
              fullWidth
              placeholder="Username"
              label="Enter Username"
              id="username"
               InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => onApplyUsername(document.getElementById('username').value)} sx={{ mr: -0.5 }}>
                      Verify
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            
          <TextField
              fullWidth
              placeholder="Amount"
              label="Enter Amount"
              disabled={!discount}
              id="amount"
              onKeyUp={() => onGetTotal(document.getElementById('amount').value)}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
