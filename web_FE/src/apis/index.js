import authorizedAxios from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

export const handleLogOutAPI = async () => {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('userInfo')
  return await authorizedAxios.delete(`${API_ROOT}/v1/users/logout`)

}

export const handleRefreshTokenAPI = async () => {
  return await authorizedAxios.put(`${API_ROOT}/v1/users/refresh_token`)
}