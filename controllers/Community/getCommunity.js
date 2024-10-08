const database = require('../../database/database');

exports.getCommunity = async (req, res) => {
  const writeNumber = req.params.write_number;
  try {
    const result = await database.query('SELECT * FROM community where write_number=$1', [writeNumber]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};
