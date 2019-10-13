import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'babel-polyfill';

require('dotenv').config();

ReactDOM.render(
  React.createElement(App),
  document.getElementById('root'),
);
