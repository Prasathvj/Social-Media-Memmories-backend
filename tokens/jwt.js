const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const generateJwtToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.SECRET_KEY,
        {expiresIn:process.env.SECRET_KEY_EXPIRE}
    )
}

const getResetToken = (user)=>{
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordTokenExpire = Date.now()+ 30 * 60 * 1000;
    return token
}

module.exports={generateJwtToken, getResetToken}