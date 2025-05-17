import jwt from "jsonwebtoken";

const jwt_secret: string = useRuntimeConfig().jwt_secret as string;
const jwt_expiration: string = useRuntimeConfig().public
  .jwt_expiration as string;

export function sign(payload: any): string {
  return jwt.sign(payload, jwt_secret, { expiresIn: jwt_expiration });
}
