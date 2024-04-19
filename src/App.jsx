import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { fetchContacts } from './redux/contactsOps';
import { selectError, selectLoading } from './redux/contactsSlice';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import Loader from './components/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Toaster position="top-right" />
      <ContactForm />
      <SearchBox />
      <ContactList />
      {loading && !error && <Loader />}
    </div>
  );
}

export default App;
