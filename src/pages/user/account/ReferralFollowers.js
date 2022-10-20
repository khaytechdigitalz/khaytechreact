import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
// @mui
import { Box, Grid, Card, Button, Avatar, Typography } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';

import {
  SkeletonProductItem,
} from '../../../components/skeleton';
import useAuth from '../../../hooks/useAuth';
 
// ----------------------------------------------------------------------

ProfileFollowers.propTypes = {
  followers: PropTypes.array,
};

export default function ProfileFollowers({ followers }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get('/user/referrals').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return <SkeletonProductItem  sx={{ width: 40 }} />;
  const results = JSON.stringify(post.data.data.transactions);
  const refers = JSON.stringify(post.data.data.ref);
  const personObject = JSON.parse(results);
  const ReferedObject = JSON.parse(refers);
  const slash = '/';
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
       My Followers
      </Typography>

      <Grid container spacing={3}>
        {ReferedObject.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FollowerCard follower={follower} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

FollowerCard.propTypes = {
  follower: PropTypes.object,
};

function FollowerCard({ follower }) {
  const { firstname, address, avatarUrl, isFollowed, lastname,status } = follower;

  const [toggle, setToogle] = useState(isFollowed);
   const { general,user, host, image,avatar } = useAuth();
   const slash = '/';
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={firstname} src={host+image.profile.user.path+slash+follower.image} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {firstname} {lastname} 
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {address.country}
           </Typography>
        </Box>
      </Box>
     
      {(() => {
                if (status === '0') {
                  return (
                    <Button
        size="small"
        variant={'outlined'}
        color={status ? 'error' : 'inherit'}
       >
         Inactive
      </Button>
                  )
                }
                if (status === '1') {
                  return (
                    <Button
        size="small"
        variant={'outlined'}
        color={status ? 'success' : 'inherit'}
       >
         Active
      </Button>
                  )
                } 
                 
              })()}
    </Card>
  );
}
