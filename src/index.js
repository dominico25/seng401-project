 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '52196466868-3n2nemknh184a6nsp6vp900g77jqd0ak.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GoogleOAuthProvider clientId={clientId} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  
  </>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
