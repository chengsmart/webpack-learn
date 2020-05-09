const glob = require('glob-all');

describe('测试html生成', () => {
  it('应该生成html文件', (done) => {
    const files = glob.sync(['./dist/home.html']);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no html files generated');
    }
  });
});