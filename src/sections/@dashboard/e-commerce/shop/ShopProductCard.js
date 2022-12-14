/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { id, user, amount, name, cover, price, colors, status, priceSale } = product;

  const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(amount));
  const image_path = "https://localhost/afrimailreactt/assets/images/user/profile/"; 
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <Image alt={id} src={image_path+user.image} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {user.username}
            {image_path+user.image}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
 
          <Stack direction="row" spacing={0.5}>
            {amount && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(amount)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(amount)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
