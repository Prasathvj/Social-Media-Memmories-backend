const  User  = require("../models/userModel")
const bcrypt = require('bcrypt')
const {generateJwtToken,getResetToken} = require('../tokens/jwt')
const {sendMail} = require("../tokens/nodemail")

const crypto = require('crypto')
//user signup - /user/signup
const signup = async(req, res)=> {
    
    try {
       let user = await User.findOne({email:req.body.email});
       if(user){
        //excit user
        res.status(400).json({error:'given email id alredy exsits'})
       }
       else{
        //new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(req.body.password, salt)
        user = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashedPassword
        }).save()
        const token = generateJwtToken(user._id)
        res.status(200).json({
            message:"signup successfully",
            token
        })
       }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:'Internal server error'})
    }
}

//user's login
const login =async(req, res)=>{
    try {
        //check email is valid
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(200).json({message:'user email or password not valid'})
        }
        //check password is valid
        const validPassword = await bcrypt.compare(
            req.body.password, 
            user.password)
        if(!validPassword){
           return  res.status(200).json({message:'user email or password not valid'})
        }

        const token = generateJwtToken(user._id)
         return res.status(200).json({
            message:'login successful',
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error:'Internal server error'})
    }
}

//user's forgot password
const forgotPassword = async(req, res)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200).json({message:'user not found'})
        }
        else{
            //set reset password token
            const resetToken = getResetToken(user)
            await user.save()
            //create reset url
            const resetUrl  = `https://3000/reset/password${resetToken}`

            const message = `Your password reset url is as follows \n\n 
            ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

            // Save the reset token in the database
            await user.save();

            //nodemail
            sendMail({
                email:user.email,
                subject:'Reset Password',
                message
            })

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`
            })
        

        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:'Internal server error'})
    }
}

//user's reset paassword

const resetPassword = async(req,res)=>{
    try {
         const resetToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
         const user = await User.findOne({
            resetPasswordToken:resetToken,
            resetPasswordTokenExpire:{ $gt: Date.now()}
         })
         if(!user){
            return res.status(200).json({message:'expired or invalied token'})
         }
         if(req.body.password !== req.body.confirmPassword){
            return res.status(200).json({message:'Password does not match'})
         }
         //encripte the new password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(req.body.password, salt)

         user.password = hashPassword;
          //remove the password reset tokens in the database
         user.resetPasswordToken = undefined;
         user.resetPasswordTokenExpire = undefined;
         //save the user info in db
         await user.save();

        return  res.status(200).json({
            user,
            message:'reset password successful' 
        }) 
    } catch (error) {
        console.log(error)
        res.status(400).json({error:'Internal server error'})
    }
   
}

module.exports = {login, signup, forgotPassword, resetPassword};