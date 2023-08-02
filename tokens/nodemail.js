
const nodemailer = require('nodemailer')
const sendMail=(options)=>{
    const transPoerter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASS
        }
    });
    const mailOptions = {
        from:"prasathvj17@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    transPoerter.sendMail(mailOptions,(error)=>{
        if(error){
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        return res.status(200).json({ message: 'Email sent successfully' });
    })
}

module.exports = {sendMail}