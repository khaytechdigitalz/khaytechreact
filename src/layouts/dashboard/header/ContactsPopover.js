import { useState,useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemAvatar, MenuItem } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _contacts } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import BadgeStatus from '../../../components/BadgeStatus';
import { IconButtonAnimate } from '../../../components/animate';
import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const [post, setPost] = useState(null);


  useEffect(() => {
    axios.get('/user/contacts').then((response) => {
      setPost(response);
      console.log(response);
     
    });
  }, []);
  if (!post) return null;
  const results = JSON.stringify(post.data.contacts);
  const rep = (Object.values(results));
  const personObject = JSON.parse(results);
  const isNotFound = (!personObject.length );

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 320,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 1.5 }}>
         My Contacts <Typography component="span">({personObject.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 4 }}>
          {personObject.map((contact) => (
            <MenuItem key={contact.id}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={contact.user.username} />
                <BadgeStatus status={contact.username} sx={{ position: 'absolute', right: 1, bottom: 1 }} />
              </ListItemAvatar>
             
              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={contact.user.username}
                secondary={contact.status === 1 && fToNow(contact.created_at)}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
