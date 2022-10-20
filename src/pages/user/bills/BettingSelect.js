import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';

import {
  TableSkeleton,
} from '../../../components/table';
import useAuth from '../../../hooks/useAuth';
 import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get('/bettingcompany').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <TableSkeleton  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.company);
  const Object = JSON.parse(results);
  const slash = '/';

  const handleViewRow = (company) => {
    navigate(PATH_DASHBOARD.dashboard.bettings.view(company));
   };
  return (
    <Box sx={{ mt: 5 }}>
       
       <Grid container spacing={3}>
        {Object.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FollowerCard follower={follower}
             onViewRow={() => handleViewRow(follower.PRODUCT_CODE)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.object,
  onViewRow: PropTypes.func,

};

function FollowerCard({ follower,onViewRow }) {
  const { PRODUCT_CODE } = follower;
  const navigate = useNavigate();

   const slash = '/';
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      
      <Avatar alt={PRODUCT_CODE} src={`/images/${PRODUCT_CODE}.png`} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
         {PRODUCT_CODE}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {PRODUCT_CODE}
           </Typography>
        </Box>
      </Box>
     
      
        <Button
        onClick={onViewRow} 
        size="small"
        variant={'outlined'}
        color={PRODUCT_CODE ? 'primary' : 'inherit'}
       >
         Select
      </Button>
             
    </Card>
  );
}
