const router = require('express').Router();
const { deleteCommunity } = require('../controllers/Community/deleteCommunity');

router.delete('/delete_community/', deleteCommunity);

module.exports = router;
