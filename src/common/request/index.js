import axios from "axios";
import { message } from "ant-design-vue";
import config from "@/assets/js/config";
import router from "../../router";
import * as utils from "@/assets/js/utils";
import { convertParams } from "@/assets/js/utils.js";
//全局设置baseURL.
axios.defaults.baseURL = config.http.baseUrl;
axios.defaults.timeout = config.http.timeout;
const baseUrlInstanc = config.http.baseUrlInstanc;
// axios.defaults.headers = { Authorization: Cookies.get("token") }
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";

// axios.defaults.withCredentials = true;

// 请求前拦截
axios.interceptors.request.use(
 (config) => {
   // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
   let Authorization = "Bearer " + sessionStorage.getItem("userToken");
   if (!config.headers.hasOwnProperty("Authorization") && Authorization) {
     config.headers.Authorization = Authorization;
   }
   return config;
 },
 (error) => {
   return Promise.reject("请求配置失败!");
 }
);


/*是否有请求正在刷新token*/
window.isRefreshing = false
/*被挂起的请求数组*/
let refreshSubscribers = []
/*push所有请求到数组中*/
function subscribeTokenRefresh (cb) {
  refreshSubscribers.push(cb)
  console.log(refreshSubscribers);
}
/*刷新请求（refreshSubscribers数组中的请求得到新的token之后会自执行，用新的token去请求数据）*/
function onRrefreshed (token) {
  refreshSubscribers.map(cb => cb(token))
}

// 设置统一response
axios.interceptors.response.use(
  (response) => {
    if(response.data.msg == "当前IP不支持访问"){
      message.error("很抱歉，您的访问出现些问题，联系管理员!");
      redirectLogin(router.currentRoute.fullPath);
    }
    if (response.status === 200) {
      return response;
    }
  },
  (err) => {
    console.log(err);
    // 接口报错
    if(err.code=="ERR_NETWORK"){
      message.error("数据请求错误，请检查网络或联系管理员");
    }
    // 401token过期
    if (err.response.status === 401) {
      console.log(err);
      if(!window.isRefreshing){
        window.isRefreshing = true
        // 再次请求刷新token
        const token = sessionStorage.getItem("userToken");
        axios.get(axios.defaults.baseURL + "/Login/RefreshToken?token=" + token ).then(function(response) {
          console.log('接口401：',response);
          message.warning("正在更新用户信息，如遇到操作失误请刷新页面后重试！");
          // sessionStorage.removeItem("userToken")
          if (response.data.status == 200) {
            sessionStorage.setItem("userToken",response.data.response.token)
            err.config.headers.Authorization = "Bearer " +  response.data.response.token
            window.isRefreshing = false
            refreshSubscribers.forEach(cb => cb())
            refreshSubscribers = []
            return axios(err.config);
          } else {
            sessionStorage.removeItem("userToken")
            redirectLogin(router.currentRoute.fullPath);
          }
        }).catch(function(error) {
          window.isRefreshing = false;
          // sessionStorage.clear();
          // redirectLogin();
        });
      }else{
        /*把请求(token)=>{....}都push到一个数组中*/
        // let retry = new Promise((resolve, reject) => {
        //   /*(token) => {...}这个函数就是回调函数*/
        //   subscribeTokenRefresh((token) => {
        //     console.log(token);
        //     console.log(err.headers.Authorization);
        //     err.headers.Authorization = token;
        //     /*将请求挂起*/
        //     resolve(err)
        //   })
        // })
        // return retry
        // 正在刷新token ,把后来的接口缓冲起来
        console.log(err)
        console.log(err.config)
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
                resolve(request(err.config));
            });
        })
      }
    }
    // 403token错误
    if (err.response.status === 403) {
      message.warning("很抱歉，您的访问权限等级不够，联系管理员!");
    }
    // 403token错误
    if (err.response.status === 404) {
      message.warning("数据请求404");
    }
    // 500token错误
    if (err.response.status === 500) {
      message.error("请求数据出错，请联系管理员");
    }
  }
);

// 跳转至重新登录页面

function redirectLogin(url) {
  // const roleCode = sessionStorage.getItem("roleCode");
  // if (roleCode == "ROLE_ADMIN") {
  //   router.push({
  //     name: "login",
  //   });
  // }
  // if (roleCode == "ROLE_USER") {
  // }
  router.push({path: `/`});
}

export default {
  /**
   * 发送get请求
   * @param {string} url 请求地址
   * @param {object} params 请求数据(可选)
   */
  get(url, params) {
    return axios({
      method: "get",
      url,
      params,
    })
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  },
  /**
   * 发送post请求
   * @param {string} url 地址
   * @param {object} data 请求数据
   * @param {object} [params] 请求数据
   * @param {Function} fail 失败回调(可选)
   */
  post(url, data, params, fail) {
    return axios({
      method: "post",
      url,
      data,
      params,
    })
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        // if (fail) {
        //   fail(error);
        // } else {
        //   Message.error({
        //     message: error,
        //   });
        // }
      });
  },
  //post特殊请求
  postAdmin(Url, params, data, done, fail) {
    const url = params ? `${Url}?${convertParams(params)}` : Url;
    return axios
      .post(url, data)
      .then((data) => {
        return data.data
      }
      )
      .catch((error) => {
        console.log(error);
        console.log(fail);
      });
  },
  /**
   * 发送put请求
   * @param {string} url 地址
   * @param {object} data 请求数据
   * @param {object} [params] 请求数据
   * @param {Function} fail 失败回调(可选)
   */
  put(url, data, params, fail) {
    return axios({
      method: "put",
      url,
      data,
      params,
    })
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        if (fail) {
          fail(error);
        } else {
          message.error({
            message: error,
          });
        }
      });
  },
  /**
   * 发送delete请求
   * @param {string} url 请求地址
   * @param {object} params 请求数据(可选)
   */
   delete(url, params) {
    return axios({
      method: "delete",
      url,
      params,
    })
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        return error;
      });
  },
};
