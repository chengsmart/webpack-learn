import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';

import { Carousel, WingBlank } from 'antd-mobile';

const App = () => {
  const [env, setEnv] = useState('需要本地配置config');
  const [carouselList, setCarouselList] = useState([
    'AiyWuByWklrrUDlFignR',
    'TekJlZRVCjLFexlOCuWn',
    'IJOtIlfsYdTyaDTRVrLI',
  ]);

  useEffect(() => {
    console.log(`3秒后页面变蓝`);
    setTimeout(() => {
      try {
        $('body').css('background', '#d0e0f0');
      } catch (error) {
        console.log(`dom操作失败`);
        console.log(error);
      }
    }, 3000);
  }, []);

  return (
    <div className="container">
      <h1>webpack</h1>
      <h2>React</h2>
      <h2>当前环境是：{env}</h2>

      <WingBlank>
        <Carousel autoplay={true} infinite>
          {carouselList.map((val) => (
            <a
              key={val}
              href="https://www.baidu.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: 200,
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                style={{ width: '100%', verticalAlign: 'top' }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    </div>
  );
};
export default hot(App);
