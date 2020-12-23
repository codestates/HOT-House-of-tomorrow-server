const { User } = require('../../../models'); 
const jwt = require('jsonwebtoken');
const config = require('../../../config/index')
const { SECRET } = config;

async function findToken(token){
  let tokenData;
  let userInfo;
  try{
    tokenData = jwt.verify(token, SECRET);
    userInfo = await User.findOne({
      where: {email: tokenData.email}
    });
  }catch(err){
    tokenData = null;
    return tokenData;
  }
  return userInfo;
}

module.exports = (req, res) => {
  let token = req.cookies.x_auth;
  let tokenData;
  !token
    ? res.json({ isAuth: false, token: token })
    : tokenData = findToken(token);
  !tokenData
    ? res.state(500).json({isAuth: false})
    : res.json({ 
        name : tokenData.name, 
        email : tokenData.email, 
        nickname : tokenData.nickname,
        profileImg : tokenData.profileImg,
        isAuth : true,
     });
};