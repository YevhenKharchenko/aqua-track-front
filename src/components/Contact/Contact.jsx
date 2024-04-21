import { FaPhone } from 'react-icons/fa6';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../../redux/contacts/operations';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import css from './Contact.module.css';

const Contact = ({ name, number, id }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <ListItemAvatar>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={
          <>
            <FaPhone style={{ marginRight: 10 }} />
            {number}
          </>
        }
      />
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        type="button"
        onClick={() => {
          setOpenEdit(true);
        }}
        sx={{ marginRight: 2 }}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        type="button"
        onClick={() => {
          setOpenDelete(true);
        }}
      >
        Delete
      </Button>

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete contact &quot;{name}&quot;?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>No</Button>
          <Button
            onClick={() => {
              dispatch(deleteContact(id));
              setOpenDelete(false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        PaperProps={{
          component: 'form',
          onSubmit: event => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const values = Object.fromEntries(formData.entries());
            dispatch(editContact({ id, values }));
            handleCloseEdit();
          },
        }}
      >
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you wish to edit this contact, please enter the new values.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label={name}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="number"
            name="number"
            label={number}
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit">Accept</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Contact;
