import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
// import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import BaseRouter from '@routes/index';
// import history from '@routes/history';
// import configureStore from '../store';

// import './index.less';

// const store = configureStore();

// const App = () => (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <BaseRouter />
//     </ConnectedRouter>
//   </Provider>
// );
const App = () => {
  const [env, setEnv] = useState('需要本地配置config');

  useEffect(() => {
    console.log('需要本地配置config');
  }, []);

  return (
    <div className="container">
      <h1>webpack</h1>
      <h2>React</h2>
      <h2>当前环境是：{env}</h2>
    </div>
  );
};
export default hot(App);
