import { FaPhone } from 'react-icons/fa6';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../../redux/contacts/operations';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short! Min 3 characters.')
      .max(50, 'Too Long! Max 50 characters.')
      .required('Required'),
    number: Yup.string()
      .min(7, 'Too Short! Min 7 digits.')
      .max(12, 'Too Long! Max 12 digits.')
      .matches(/^(?!-)[-\d]+(?<!-)$/, "Wrong format, only digits or '-' allowed")
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: name,
      number: number,
    },
    validationSchema: FeedbackSchema,
    onSubmit: values => {
      dispatch(editContact({ id, values }));
      handleCloseEdit();
    },
  });

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
          onSubmit: e => {
            e.preventDefault();
            formik.handleSubmit();
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
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            type="text"
            fullWidth
            variant="outlined"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="number"
            name="number"
            label="Number"
            value={formik.values.number}
            onChange={formik.handleChange}
            type="text"
            fullWidth
            variant="outlined"
            error={formik.touched.number && Boolean(formik.errors.number)}
            helperText={formik.touched.number && formik.errors.number}
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
