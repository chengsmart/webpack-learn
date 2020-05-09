import 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
// import Common from '../common';

import App from './app.tsx';

import './index.less';

const Home = (): void => {
  // Common();
  render(<App />, document.getElementById('app'));
};
export default Home;
