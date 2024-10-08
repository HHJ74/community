const database = require('../../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registUser = async (req, res) => {
  try {
    // 이메일 중복 확인
    const { rows } = await database.query(
      'SELECT id FROM users WHERE email = $1',
      [req.body.email]
    );

    if (rows.length > 0) {
      return res.status(409).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const salt = 10;
    const hash = await bcrypt.hash(req.body.password, salt);

    const values = [
      req.body.userId,
      hash,
      req.body.name,
      req.body.phone || null,
      req.body.cellphone,
      req.body.email,
      req.body.birth || null
    ];

    const userResult = await database.query(
      `INSERT INTO users (userId, password, name, phone, cellphone, email, birth) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      values
    );

    const newUserId = userResult.rows[0].id;
    await database.query(
      'INSERT INTO cart (user_id, created_at) VALUES ($1, CURRENT_TIMESTAMP)',
      [newUserId]
    );
    console.log(req.body)
    return res.status(201).json({ message: 'Account Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


