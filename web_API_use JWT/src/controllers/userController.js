import { StatusCodes } from 'http-status-codes'
import ms from 'ms'
import {env} from '../config/environment'
import { JWTprovider } from '~/providers/JwtProvider'
import jwt from 'jsonwebtoken'

const MOCK_DATABASE = {
  USER: {
    ID: 'SonPham-id-12345678',
    EMAIL: 'SonPham811@gmail.com',
    PASSWORD: 'SonPham8112005'
  }
}

const login = async (req, res) => {
  try {
    if (req.body.email !== MOCK_DATABASE.USER.EMAIL || req.body.password !== MOCK_DATABASE.USER.PASSWORD) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Your email or password is incorrect!' })
      return
    }

    // Trường hợp nhập đúng thông tin tài khoản, tạo token và trả về cho phía Client
    const userInfo = {
      id: MOCK_DATABASE.USER.ID,
      email: MOCK_DATABASE.USER.EMAIL
    }

    const accessToken = await JWTprovider.generate(userInfo, env.ACCESS_TOKEN_SECRET_SIGNATURE, 5)
    const refreshToken = await JWTprovider.generate(userInfo, env.REFRESH_TOKEN_SECRET_SIGNATURE, ms('7d')) // Sau 7 ngày thì user sẽ bị logout và login lại

    //Lưu access,refresh Token vào cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // Fe và Be khác domain vẫn lấy dc cookie
      maxAge: ms('7d') // Thông thường sẽ để hạn cookie bằng với refreshToken chứ ko phải accessToken vì khi token bị gỡ => accessToken bị gỡ => BE ko nhận dc accessToken để biết là nó hết hạn => rơi vào trg hợp ko tồn tại accessToken
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7d')
    })

    res.status(StatusCodes.OK).json({
      ...userInfo,
      accessToken,
      refreshToken

    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    res.status(StatusCodes.OK).json({ message: 'Logout API success!' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const refreshToken = async (req, res) => {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies?.refreshToken//req.body?.refreshToken(localStorage)

    // Verify token
    const refreshTokenDecoded = await JWTprovider.verifyToken(refreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE);

    // Create new access token
    const userInfo = {
      id: refreshTokenDecoded.id,
      email: refreshTokenDecoded.email
    }

    const newAccessToken = await JWTprovider.generate(userInfo, env.ACCESS_TOKEN_SECRET_SIGNATURE, 5)

    // Save new access token in cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7d'),
    })

    res.status(StatusCodes.OK).json({ accessToken: newAccessToken})
  } catch (error) {
    console.error(error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('invalid token ')

  }
};

export const userController = {
  login,
  logout,
  refreshToken
}