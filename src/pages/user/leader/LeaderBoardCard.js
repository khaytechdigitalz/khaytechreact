/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import Image from '../../../components/Image';
import { ColorPreview } from '../../../components/color-utils';
import { HOST_URL } from '../../../config';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

LeaderBoardCard.propTypes = {
  product: PropTypes.object,
};

export default function LeaderBoardCard({ product,index }) {
  const { id, user, amount, name, status,count } = product;
  const {general} = useAuth();
  const linkTo = "#"; // PATH_DASHBOARD.eCommerce.view(paramCase(user.username));
  const image_path = `${HOST_URL}/assets/images/user/profile/`; 
  const image = user.image ?  user.image :  "default.png";
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
            {index+1}
          </Label>
        )}
         <Image alt={id} src={image_path+image}  />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
           Vendor: {user ? user.username : ''}
           </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
 
          <Stack direction="row" spacing={0.5}>
            <Typography variant="subtitle2">Transactions: {general.cur_sym}{fCurrency(count)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
