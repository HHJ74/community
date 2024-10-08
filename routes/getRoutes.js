const router = require('express').Router(); // api path를 전달해 주는 메서드

const { getCommunity } = require('../controllers/Community/getCommunity');
const { loginUser } = require('../controllers/UserInfo/loginUser');


router.get('/get_community/', getCommunity);
router.post('/login/', loginUser)


module.exports = router; // router 변수를 모듈로 사용할 수 있도록 설정
