// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user,avatar} = useAuth();
  const slash = '/';
  return (
    <Avatar
      src={avatar}
      alt={user?.username}
      color={user?.image ? 'primary' : createAvatar(user?.username).color}
      {...other}
    >
      {createAvatar(user?.username).name}
    </Avatar>
  );
}
