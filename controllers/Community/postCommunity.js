const database = require('../../database/database');
const { v4: uuid4 } = require('uuid');

exports.postCommunity = async (req, res) => {
  const _id = uuid4();
  const { title, description, date, userId } =
    req.body;
  // console.log(title, description, date, userId);

  try {
    await database.query(
      'INSERT INTO task (_id, title, description, date, userId) VALUES ($1, $2, $3, $4, $5 )',
      [_id, title, description, date, userId]
    );

    return res.status(201).json({ message: 'Task Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
