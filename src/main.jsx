import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {NextUIProvider} from "@nextui-org/react";
import { Provider } from 'react-redux'
import store from './store.jsx';
import {GoogleOAuthProvider} from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <NextUIProvider>
        <GoogleOAuthProvider clientId="622861176382-amsrvfsjbkqqrtrm6993085l0ufnf5ul.apps.googleusercontent.com">
          <Provider store={store} > 
              <App />
          </Provider>
        </GoogleOAuthProvider>
      </NextUIProvider>
  </React.StrictMode>
)
