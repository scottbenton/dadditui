import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import { Daddit } from 'Daddit';
import * as serviceWorker from 'serviceWorker';

// import { initAuth } from 'auth/initAuth';
require('typeface-open-sans');
require('typeface-ibm-plex-sans');

ReactDOM.render(<Daddit />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
