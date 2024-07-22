import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import 'modern-normalize';
import { HelmetProvider } from 'react-helmet-async';
import { ModalProvider } from './context/ModalProvider.jsx';
import App from './App.jsx';
import { store, persistor } from './redux/store.js';
import './index.css';
import './i18n.js'; // Імпортуйте ваш файл i18n.js

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
