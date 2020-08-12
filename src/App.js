import React , {Component} from 'react';
import './App.css';
import HomePage from './components/HomePage.js';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component{
  render(){
    return (
      <Provider store = {store}>
        <div>
          <HomePage />      
        </div>
      </Provider>
    );
  }
}

export default App;
