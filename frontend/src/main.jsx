import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RecoilRoot>
          <BrowserRouter>
              <App />
              <ToastContainer
                  position="top-right"
                  autoClose={1500}
                  closeOnClick
                  pauseOnHover
              />
          </BrowserRouter>
      </RecoilRoot>
  </React.StrictMode>,
)
