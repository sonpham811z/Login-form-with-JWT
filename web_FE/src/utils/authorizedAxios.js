// Xử lí lỗi tập trung
/*eslint-disable*/

import axios from 'axios'
import { toast } from 'react-toastify'
import { handleLogOutAPI, handleRefreshTokenAPI } from '~/apis'


const authorizedAxios = axios.create({})

// config axios
// Có 2 loại lưu token là từ cookie và từ localstorage, chỉ cần làm 1 trong 2 
//

authorizedAxios.defaults.timeout = 1000*60*10 // Tất cả các req nếu be trả về data quá 10p thì cancel req
authorizedAxios.defaults.withCredentials = true //cho phép Axios gửi các cookies hoặc thông tin xác thực (như session cookies, token xác thực) cùng với yêu cầu HTTP đến máy chủ.


// Interceptors
authorizedAxios.interceptors.request.use((config) => {
    // Do something before request is sent
    // Ở interceptors lúc gừi req, ta đính kèm access token vào header từ localStorage
    // Thêm Bearer là mã thông báo để xác định đây là token dùng để uỷ quyền , ngoài ra còn nhiều loại token như: Bearer, Basic, Digest, OAuth, etc.
    // config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

    // return config;
    return config
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

  // Dùng để hold API refresh token cho đên khi xong xuôi thì mới retry các API bị lỗi tránh việc call API nhiều lần
let refreshTokenPromise = null

authorizedAxios.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async(error) => {
    // Gọi API để làm mới accesstoken khi hết hạn
    if(error.response.status === 401) // 401 Unauthorized thỉ logout luôn
    {
      handleLogOutAPI().then(() => location.href = '/login')
    }

    const originalRequest = error.config;
    if(error.response.status === 410 && originalRequest) {

      if(!refreshTokenPromise) {
        refreshTokenPromise =  handleRefreshTokenAPI().then((res) =>
        {

        })
        .catch((err) => {
          handleLogOutAPI().then(() => location.href = '/login')
           return Promise.reject(err)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
        
      }

      return refreshTokenPromise.then(() => {
        // Gọi lại các API bị lỗi
        return authorizedAxios(originalRequest)
      })


    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Status code 410 thì ko trigger vì nó dùng để đặt cho làm mới lại refreshToken (GONE)
    // Do something with response error
    if(error.response.status !== 410){
        toast.error(error.response?.data?.message || error?.message)
    }

    return Promise.reject(error);
  });

export default authorizedAxios