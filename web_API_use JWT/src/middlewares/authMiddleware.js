/* eslint-disable */

import { JWTprovider } from '~/providers/JwtProvider'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

const isAuthorized = async (req,res,next) => {
    const accessTokenFromCookie = req.cookies?.accessToken 
    // const accessTokenFromHeader = req.header.authorization


    if(!accessTokenFromCookie) {
        res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized! Please login first.'})
        return 
    }
    
    try {
        // Giải mã Token xem có hợp lệ không
        const accessTokenDecoded = await JWTprovider.verifyToken(accessTokenFromCookie, env.ACCESS_TOKEN_SECRET_SIGNATURE)

        
        //Lưu thông tin giải mã vào JwtDecoded
        req.jwtDecoded =  accessTokenDecoded
        

        next()

        
    } catch (error) {
        // TH1: TOKEN hết hạn
        if(error.message?.includes('expired')) {
            res.status(StatusCodes.GONE).json({message: 'Token expired! Please refresh token.'})
            return
        }
        // TH2: còn lại
        res.status(StatusCodes.UNAUTHORIZED).json({message: 'coincard! Please login first.'})
        console.log(error);
        
    }
    
    
}

export const authMiddleware = {
    isAuthorized
}