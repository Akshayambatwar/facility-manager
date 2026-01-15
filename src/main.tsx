import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import './styles/tailwind.css';

import { store } from '@/store';
import { RoleProvider } from '@/auth/role.provider';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RoleProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <App />
    </RoleProvider>
  </Provider>
);
