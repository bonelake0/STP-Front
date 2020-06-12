import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './reducer/configureStore';
import { Router } from 'react-router-dom';
import history from './history';

import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends Component {
    
  render () {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    );
  }
}


export default App;
