import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
import 'modern-normalize';
import { HelmetProvider } from 'react-helmet-async';
import { ModalProvider } from './context/ModalProvider.jsx';
import App from './App.jsx';
import { store } from './redux/store.js';
import './index.css';
import { TourProvider } from '@reactour/tour';
import { steps } from './steps';

const tourStyles = {
  popover: base => ({
    ...base,
    padding: '20px',
    backgroundColor: '#fff',
    color: '#323f47',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
  }),
  badge: base => ({
    ...base,
    backgroundColor: ' #9be1a0',
    color: '#fff',
  }),
  close: base => ({
    ...base,
    display: 'none',
  }),
  dot: (base, { current }) => ({
    ...base,
    backgroundColor: current ? ' #9be1a0' : '#fff',
  }),
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ModalProvider>
          <HelmetProvider>
            <TourProvider steps={steps} styles={tourStyles}>
              <App />
            </TourProvider>
          </HelmetProvider>
        </ModalProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
