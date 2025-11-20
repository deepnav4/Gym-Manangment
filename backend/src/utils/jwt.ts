import jwt from 'jsonwebtoken';

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
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
  );
};

/**
 * Generate JWT Refresh Token
 * @param payload - User data to encode in token
 * @returns Refresh token string
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
  );
};

/**
 * Verify JWT Access Token
 * @param token - Token to verify
 * @returns Decoded token payload
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as TokenPayload;
};

/**
 * Verify JWT Refresh Token
 * @param token - Token to verify
 * @returns Decoded token payload
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
};
