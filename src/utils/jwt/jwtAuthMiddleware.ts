import { verify, IJwtPayload } from './jwtUtils'
import * as express from 'express'
import * as JwtException from '../../exceptions/jwt/index'

export const jwtAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const accessToken = req.headers[process.env.JWT_ACCESS_TOKEN]
  const refreshToken = req.headers[process.env.JWT_REFRESH_TOKEN]

  if (!accessToken || !refreshToken)
    throw new JwtException.JwtNotExistsException()

  try {
    req.ctx.user = (await verify(accessToken)) as IJwtPayload
    return next()
  } catch (e) {
    throw e
  }
}
