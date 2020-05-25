import 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import App from './app';

import './index.less';

const Home = (): void => {
  render(<App />, document.getElementById('app'));
};
export default Home;
