import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
import {Provider} from "react-redux"
import store from './Store';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
