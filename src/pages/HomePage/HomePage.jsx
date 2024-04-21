import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <Typography variant="h2" component="h1" sx={{ marginTop: 20 }}>
        Welcome to Contacts App!
      </Typography>
      <Typography variant="h4" component="p" sx={{ textAlign: 'center', marginTop: 2 }}>
        Here, you can manage all your contacts effortlessly for free.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: 'center', marginTop: 9, marginBottom: 3 }}
      >
        Key Features:
      </Typography>
      <List sx={{ textAlign: 'left', maxWidth: 700, margin: '0 auto' }}>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Intuitive user interface made with Material UI." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Create free personal account, where you can manage and organize your contacts." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Easily create, edit and delete your contacts with our reliable validation system." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Quickly search and find contacts by name or number with ease." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Securely store and sync your contacts across devices with our database on Heroku." />
        </ListItem>
      </List>
    </>
  );
};

export default HomePage;
