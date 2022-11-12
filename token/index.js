const jsonwebtoken = require('jsonwebtoken')
const secret = 'shared-secret';
const payload = {user_name:'Jack', id:3, email: '1234@gmail.com'};

//获取生成token
function getToken(payload= {user_name:'Jack', id:3, email: '1234@gmail.com'}){
    return   jsonwebtoken.sign(payload, secret, { expiresIn:  '1h' });
}
function verifyToken(token){
      return   jsonwebtoken.verify(token,secret);
}
module.exports = {getToken,verifyToken}
