import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { createStore,applyMiddleware } from 'redux';
// import allReducers from './reducers';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';

// const initialStore ={};

// const midleware = [thunk]; 

// const store = createStore(allReducers,initialStore,
//   applyMiddleware(...midleware));


// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
