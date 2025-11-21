import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
import 'swiper/css/bundle';

import './styles/index.css';

import { App } from './app.jsx';
import { AuthProvider } from './components/utils/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)

