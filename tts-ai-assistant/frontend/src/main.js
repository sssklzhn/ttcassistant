// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.js'
// import './styles/Global.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   React.createElement(React.StrictMode, null,
//     React.createElement(App)
//   )
// )
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './styles/Global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  React.createElement(React.StrictMode, null,
    React.createElement(App)
  )
);