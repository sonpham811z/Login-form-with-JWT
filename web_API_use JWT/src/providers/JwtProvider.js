/* eslint-disable */
import JWT from 'jsonwebtoken'


// Tạo token cần 3 phần là payload, secretSignature (privateKey) & tokenLife
const generate = async(userInfo, privateKey, tokenLife) => {
    try {
        return JWT.sign(userInfo, privateKey, {algorithm: 'HS256', expiresIn: tokenLife})
    } catch (error) {
        throw new Error(error);
    }
}

const verifyToken =async (Token,privateKey) => {
    try {
        return JWT.verify(Token, privateKey)
    } catch (error) {
        throw new Error(error);
    }
}

export const JWTprovider = {
  generate,
  verifyToken
}