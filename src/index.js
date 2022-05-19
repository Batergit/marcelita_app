import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js'
import { BrowserRouter } from 'react-router-dom';
import { Proveedor } from './components/contextos/contexto';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Proveedor>
      <App />
    </Proveedor>
  </BrowserRouter>
);