import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DocumentTitle from '../../components/DocumentTitle';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <DocumentTitle>Contacts App - Page not found</DocumentTitle>
      <Typography variant="h3" component="p" sx={{ textAlign: 'center', marginTop: 20 }}>
        Page Not Found
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate('/');
          }}
        >
          Go Home
        </Button>
      </Box>
    </>
  );
};

export default NotFoundPage;
