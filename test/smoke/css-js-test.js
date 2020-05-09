const glob = require('glob-all');

describe('测试js css生成', () => {
  it('应该生成js css文件', (done) => {
    const files = glob.sync([
      './dist/home.*.js',
      './dist/home_*.css',
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error('no css js files generated');
    }
  });
});