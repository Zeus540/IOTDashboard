import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { AuthProvider } from '../src/context/auth_context';
import { DiaryProvider } from '../src/context/diary_context';

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider maxSnack={4} >
      <AuthProvider>
        <DiaryProvider>
          <App />
        </DiaryProvider>
      </AuthProvider>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
