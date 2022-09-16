import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store';

import '@cloudscape-design/global-styles/index.css';
import './index.scss';
import Router from './containers/router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);