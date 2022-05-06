import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {storage, firebase} from "./firebase"

ReactDOM.render(
  // <ReactReduxFirebaseProvider {...rrfProps}>
    <App />,
  // </ReactReduxFirebaseProvider>,
  document.getElementById('root')
)