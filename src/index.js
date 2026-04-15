import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json' with { type: 'json' };
import './i18n.js';  // ← AGREGA ESTA LÍNEA
Amplify.configure(outputs);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();