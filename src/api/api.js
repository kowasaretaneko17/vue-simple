import axios from "axios";
function transformData(data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  ret = ret.substring(0, ret.lastIndexOf('&'));
  return ret
}

// 创建axios实例
const service = axios.create({
  baseURL: "",
  timeout: 15000 // 请求超时时间
});
// request 拦截器
service.interceptors.request.use(config => {
  var xtoken = getToken();
  if (xtoken != null) {
    config.headers["Authorization"] = xtoken;
  }

  if (config.method == "post") {
    config.data = {
      ...config.data
    };
    if (config.type === 'form-data') {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded",
        config.data = transformData(config.data)
    }
  } else if (config.method == "get") {
    config.params = {
      ...config.params
    };
  }
  return config;
}),

  // respone拦截器
  service.interceptors.response.use(
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    function (response) {
      const res = response.data;
      if(res.success && res.code === '200') {
        return Promise.resolve(res.result || true);
      } else {
        Message({
          message: res.msg,
          type: "error",
          duration: 5 * 1000
        });
      }
    },
    function (error) {
      console.log("err" + error); // for debug
      Message({
        message: error.msg || error.message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(error);
    }
  );

export default service;
