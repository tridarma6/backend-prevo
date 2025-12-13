const bcrypt = require('bcrypt');
const db = require('../config/db');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../utils/tokenUtils');

class AuthService {
  async register({ name, email, phone_number, password, role }) {
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    const exitingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (exitingUser.rows[0]) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (name, email, phone_number, password, role, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, name, email, phone_number, role, created_at, updated_at`,
      [name, email, phone_number, hashedPassword, role, created_at, updated_at]
    );

    return result.rows[0];
  }

  async login({ email, password }) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const payload = { id: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days in ms
    await db.query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, refreshToken, expiresAt]
    );
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
      accessToken,
      refreshToken
    };
  }

  async refreshToken(oldRefreshToken) {
    try {
      const query = `
            SELECT 
                rt.id,
                rt.user_id,
                rt.token,
                rt.expires_at,
                rt.created_at,
                u.role
            FROM refresh_tokens AS rt
            INNER JOIN users AS u 
                ON rt.user_id = u.id
            WHERE 
                rt.token = $1
                AND rt.expires_at > NOW();
            `;

      const tokenResult = await db.query(query, [oldRefreshToken]);

      const tokenRecord = tokenResult.rows[0];
      if (!tokenRecord) {
        throw new Error('Invalid or expired refresh token');
      }

      const decoded = verifyRefreshToken(oldRefreshToken);

      const payload = { id: decoded.id, role: tokenRecord.role };
      const accessToken = generateAccessToken(payload);

      return { accessToken };
    } catch (error) {
      if (error) {
        throw new Error('Invalid or expired refresh token');
      }
    }
  }

  async logout(refreshToken) {
    await db.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);

    return { message: 'Logged out successfully' };
  }
}

module.exports = new AuthService();