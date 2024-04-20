import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import css from './Contact.module.css';

const Contact = ({ name, number, id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={`${css.contactItem} ${isDeleting ? css.slideOut : ''}`}>
      <AccountCircleIcon />
      <div className={css.nameText}>
        <FaUser color="#4d5ae5" /> {name}
      </div>
      <a href={`tel:+${number}`}>
        <FaPhone color="#4d5ae5" /> {number}
      </a>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">You really want to delete contact?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              dispatch(deleteContact(id));
              setIsDeleting(true);
              setOpen(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Contact;
