/**
 * 引入axios，创建axios实例
 * 封装axios请求拦截器
 */
import axios from 'axios'
import router from '@/router'
import _global from '../components/Global'
import qs from 'qs'

// 配置请求头
// let instance = axios.create({
//     //baseURL: 'http://localhost:8081/api/proxy',
//     baseURL: 'http://139.129.207.35:8084/api/proxy',
//     timeout: 5000,
//     withCredentials: true,
// });
//let baseURL = "http://localhost:8081/api/proxy";
//let baseURL = "http://47.104.200.60/api/proxy";
//let baseURL = "http://47.104.236.209:8084/api/proxy";
//let baseURL = "http://139.129.207.35:8084/api/proxy";
//let baseURL = "http://192.168.0.100:8081/api/proxy";
let baseURL = _global.Server + "/api/proxy";

// 这里我声明了一个全局变量loading，来统一控制请求时的等待数据的loading效果。也可以在实际请求的时候写loading，不过我觉得那样太过繁琐，多了许多代码
let loading;

// request 拦截器  在请求或响应被 then 或 catch 处理前拦截它们
// instance.interceptors.request.use(config => {
    // 请求时loading效果
/*    loading = Loading.service({
        fullscreen: true,
        lock: true,
        text: '正在加载，请稍等……',
        spinner: 'el-icon-loading'
    });*/
    // 让每个请求携带token  token的key根据实际情况自定义
/*    if (store.getters.token) {
        config.data = Object.assign({ token: store.getters.token }, config.data)
    }*/

    // 请求参数序列化
/*    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (config.method === 'post' || config.method === "put" || config.method === "delete") {
        config.data = qs.stringify(config.data)
    }*/
//     return config
// }, error => {
    // loading.close();
    // 对错误请求的处理
    // 弹出错误消息
/*    Message({
        showClose: true,
        message: error.message,
        type: 'error'
    })
    return Promise.reject(error);*/
//     alert(error.message);
// })
// response拦截器  对请求结果做一些处理
// instance.interceptors.response.use(response => {
//     console.log(response);
//     if(response.data.sTATUSCODE=='-1'){
//         router.push({name: 'login'});
//     }
    // 这里根据从后端拿到的数据做一些处理，比如不同的code对应不同的处理方式等
// }, error => {
    /*Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)*/
//     alert(error.message);
// })

/**
 * 封装并导出get方法、post方法。
 */

export default {  

    get(url, params) {
        return new Promise((resolve, reject) => {
          var token = localStorage.getItem("token");
          console.log(token);
          axios.get(baseURL+url, {
            params: params,
            headers: {
                "token" : token
            },
          },
          {emulateJSON: true}).then(res => {
              console.log(params);
            if(res.data.STATUSCODE==-1||res.data.STATUSCODE=='-1'){
                router.push({name: 'login'});
                return;
            }else{
                resolve(res.data)
            }
            resolve(res.data)
          }).catch(err => {
            reject(err)
          })
        })
      },

      post(url, params) {
        return new Promise((resolve, reject) => {
            var token = localStorage.getItem("token");
          axios.post(baseURL+url,params, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "token":token,
              },
             
            }
          ).then(res => {
            if(res.data.STATUSCODE=='-1'){
                // console.log(res.data+"------------------")
                router.push({name: 'login'});
                return;
            }else{
                resolve(res.data)
            }
          }).catch(err => {
            reject(err)
          })
        })
      }

      /*    get(url, params) {
        return instance.get(url, params).then(function (data) {
            resolve(data);
        });
    },*/

    /*    post(url, params) {
        return instance.post(url, params)
    
    }*/
}
