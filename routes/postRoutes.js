const router = require('express').Router();

const { registUser } = require('../controllers/UserInfo/registUser');

router.post('/register/', registUser);

module.exports = router;

