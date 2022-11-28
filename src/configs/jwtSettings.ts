export enum JWT_SUBJECT {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export interface IJwtClaims {
  issuer?: string
  expiresIn?: string
  subject?: JWT_SUBJECT
}

export function jwtClaims(claims?: IJwtClaims): IJwtClaims {
  return {
    issuer: claims?.issuer ?? (process.env.JWT_ISSUER || 'secret secretary'),
    expiresIn: claims?.expiresIn ?? '5m',
    subject: claims?.subject ?? JWT_SUBJECT.ACCESS,
  }
}
