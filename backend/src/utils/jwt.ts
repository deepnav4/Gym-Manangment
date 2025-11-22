import jwt, { SignOptions } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  role: 'member' | 'trainer';
}

/**
 * Generate JWT Access Token
 * @param payload - User data to encode in token
 * @returns Access token string
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_ACCESS_SECRET || 'default-secret-key';
  const expiresIn = (process.env.JWT_ACCESS_EXPIRY || '15m') as string;
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

/**
 * Generate JWT Refresh Token
 * @param payload - User data to encode in token
 * @returns Refresh token string
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-key';
  const expiresIn = (process.env.JWT_REFRESH_EXPIRY || '7d') as string;
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

/**
 * Verify JWT Access Token
 * @param token - Token to verify
 * @returns Decoded token payload
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_ACCESS_SECRET || 'default-secret-key';
  return jwt.verify(token, secret) as TokenPayload;
};

/**
 * Verify JWT Refresh Token
 * @param token - Token to verify
 * @returns Decoded token payload
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_REFRESH_SECRET || 'default-refresh-secret-key';
  return jwt.verify(token, secret) as TokenPayload;
};
