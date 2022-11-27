import { verify, updateToken, IJwtVerificationResponse } from './jwtUtils'
import * as express from 'express'
import * as JwtException from '../../exceptions/jwt/index'

export const jwtAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.headers[process.env.JWT_ACCESS_TOKEN]
  const refreshToken = req.headers[process.env.JWT_REFRESH_TOKEN]

  if (!accessToken || !refreshToken) throw new Error('no authentication token')

  try {
    const jwtVerification: IJwtVerificationResponse = await verify(accessToken)
    req.contextUserId = jwtVerification.decodedUserId
    return next()
  } catch (jwtVerification) {
    switch (jwtVerification.jwtVerificationError) {
      // 토큰 만료
      case 'TokenExpiredError':
        const newAccessToken = await updateToken(refreshToken)
        if (newAccessToken) {
          req.newAccessToken = newAccessToken
          return next()
        }
        return next(new JwtException.JwtExpiredException())

      // 토큰 오염
      case 'JsonWebTokenError':
      default:
        return next(new JwtException.JwtErrorException())
    }
  }
}
