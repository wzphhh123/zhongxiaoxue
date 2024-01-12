export default {
    /*
     * 公共路径
     */
    // path: {
    //   // source: "http://cs.bohechina.com:8060/api",
    //   source: "http://192.168.55.87:8095/api",
    // },
    /*
     *请求设置
     */
    http: {
      // 开发环境
      // baseUrl: "http://192.168.55.78:8112/ydtyweb",//线下
      // baseUrl: "http://cs.bohechina.com:8190/ydtyweb",//上线
      baseUrl: "http://cs.bohechina.com:8409/ydtyweb",//3
      timeOut: 5000, // 超时时间
    },

    /*
     * 固定值配置
     */
    // 统一日期格式
    dateFormat:{
      momentAjax:'YYYY-MM-DDTHH:mm:ss',
      momentShow:'YYYY-MM-DD HH:mm:ss',
      uiValue:"yyyy-MM-ddTHH:mm:ss",
      uiShow:"yyyy-MM-dd HH:mm:ss",
    },
  };
