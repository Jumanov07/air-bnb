import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './assets/styles/theme';
import 'react-toastify/dist/ReactToastify.css';
import store, { persistor } from './redux';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <PersistGate persistor={persistor}>
               <ToastContainer />
               <App />
            </PersistGate>
         </ThemeProvider>
      </Provider>
   </BrowserRouter>
);
