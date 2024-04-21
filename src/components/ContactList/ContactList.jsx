import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import Contact from '../Contact/Contact';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import Divider from '@mui/material/Divider';
import css from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', paddingBottom: 0 }}>
      {contacts.map(({ id, name, number }) => (
        <ListItem
          key={id}
          sx={{
            display: 'flex',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <Contact name={name} number={number} id={id} />
        </ListItem>
      ))}
    </List>
  );
};

export default ContactList;
