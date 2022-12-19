import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import { AmplifyProvider } from '@aws-amplify/ui-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

// const theme = {
//   name: 'peerpodtheme',
//   tokens: {
//     colors: {
//       background: {
//         primary: { value: "blue"},
//         secondary: {value: "yellow"}
//       }
      
//     }
//   }
// }
root.render(
  <React.StrictMode>
    {/* <AmplifyProvider theme={theme}> */}
      <App />
    {/* </AmplifyProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
