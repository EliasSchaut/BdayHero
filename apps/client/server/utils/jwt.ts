import jwt from 'jsonwebtoken';

export function sign(payload: any): string {
  const config = useRuntimeConfig();
  return jwt.sign(payload, config.jwt_secret as string, { expiresIn: config.public.jwt_expiration as string });
}
