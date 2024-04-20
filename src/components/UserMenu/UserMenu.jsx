import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  return (
    <div className={css.userMenu}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Welcome, {name}
      </Typography>
      <Button
        color="inherit"
        type="button"
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
