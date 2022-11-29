import * as jwt from 'jsonwebtoken'
import { jwtClaims } from '../../configs/jwtSettings'
import * as JwtException from '../../exceptions/jwt/index'

export interface IJwtPayload {
  userId: number
  username: string
}

// payload must be of type object!
export function sign(payload) {
  if (typeof payload !== 'object')
    throw new Error('JWT payload must be of type object')
  return jwt.sign(payload, process.env.JWT_SECRET, {
    ...jwtClaims(),
  })
}

export async function verify(token, options?): Promise<IJwtPayload> {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    return new Promise(async (resolve, reject) =>
      err || typeof decoded !== 'object' || !decoded.hasOwnProperty('userId')
        ? err.name === 'TokenExpiredError'
          ? reject(new JwtException.JwtExpiredException())
          : reject(new JwtException.JwtErrorException())
        : resolve(decoded)
    )
  })
}

export async function updateToken(refreshToken) {
  // call authentication server
  // if (refreshToken is valid) get the newAccessToken and return it
  // if not, then return null

  return 'newAccessToken'
}
