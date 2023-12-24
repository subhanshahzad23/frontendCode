import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import PublicRoutes from './router';
import axios from './api';
import {AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <AuthProvider>
        <PublicRoutes />
      </AuthProvider>
);
