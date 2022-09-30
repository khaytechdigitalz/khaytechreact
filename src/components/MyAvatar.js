// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.image}
      alt={user?.username}
      color={user?.image ? 'default' : createAvatar(user?.username).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
