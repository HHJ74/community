const database = require('../../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    try {
      console.log("Login request received");
      console.log(req.body)
      
      const { rows } = await database.query(
        'SELECT * FROM users WHERE userid = $1',
        [req.body.userId]
      );
  
      console.log(rows)
      
      if (!rows.length) {
        console.log("User not found");
        return res.status(404).json({ message: 'User not found' });
      }
  
      const compare = await bcrypt.compare(req.body.password, rows[0].password);
  
      if (!compare) {
        console.log("Password not matched");
        return res.status(401).json({ message: 'Password not matched' });
      }
  
      const id = rows[0].id;
      const name = rows[0].name;
      const email = rows[0].email;
      const userId = rows[0].userid;
      const token = jwt.sign({ id, name, email, userId }, process.env.SECRET_KEY, {
        expiresIn: '1d'
      });
  
      console.log("Token generated:", token);
  
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'None',
        secure: false, // 이 부분은 HTTPS 환경에서만 사용, 로컬 개발에서는 false로 설정
      });
  
      return res.status(201).json({ token: token });
    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({ error: error.message });
    }
  };