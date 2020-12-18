/**
 * @description 基础配置
 */
const config: any = {

  title: '后台管理框架',

  login: '/login',

  /*
  * 切换页面是否关闭页面未完成的请求
  * */
  removeAllHttpPending: true,

  development: {
    requestUrl: 'http://192.168.97.224:8687'
  },

  /**
   * @description 测试环境/内网环境
   *
   */
  st: {
    requestUrl: '//192.168.97.224:8777'
  },

  /**
   * @description 服务器人员本地测试
   *
   */
  local: {
    requestUrl: `http://${window.location.hostname}:8687`
  },

  /**
   * @description 生产环境
   *
   */
  production: {
    requestUrl: 'http://op.heyheytalk.com:9877'
  }

};

export default config;
