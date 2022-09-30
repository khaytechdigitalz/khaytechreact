import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3),
}));

// ----------------------------------------------------------------------

Widget.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  currency: PropTypes.string,
  total: PropTypes.number,
};

export default function Widget({ title, total, currency, icon }) {
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">{(currency)}{fCurrency(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'dark',
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  );
}
