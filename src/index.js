import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import './index.css';

import Sudoku from './solver/sudoku';

const game = Sudoku();

const store = createStore(
  reducer,
  {
    game: game.new(),
    candidates: [],
  },
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root')
);
