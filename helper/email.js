

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')
const { appPassword } = require('./utils');

// Function to send emails
const sendEmail = async (to, subject, templateFile, data) => {
  try {
    //start of nodemailer email verification
    var transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org', // Your SMTP host
        port: 587, // Your SMTP port (typically 587 for TLS)
        secure: false, // true for 465, false for other ports
        tls:{
            rejectUnauthorized:false
        } ,
            requireTLS:true,//this parameter solved problem for me
        auth: {
            user: 'support@altinsmart.com', // Your SMTP username 
            pass: '87f13c7314a2f1b43a64163cb629f704-b02bcf9f-a51b9450' // Your SMTP password
        }
    });

    // Load the email template using ejs
    const templatePath = path.join(__dirname, 'views', templateFile); // Path to your template file
    const emailTemplate = await ejs.renderFile(`./views/${templateFile}`,  {data})

        // Define email options
        const mailOptions = {
            from: 'support@altinsmart.com',
            to: to,
            subject: subject,
            html: emailTemplate
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true; // Return true if email is sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Return false if there's an error sending the email
    }
};

// Function to send emails
const sendGroupEmail = async (to, subject, templateFile, data) => {
  try {
    //start of nodemailer email verification
    var transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org', // Your SMTP host
        port: 587, // Your SMTP port (typically 587 for TLS)
        secure: false, // true for 465, false for other ports
        tls:{
            rejectUnauthorized:false
        } ,
            requireTLS:true,//this parameter solved problem for me
        auth: {
            user: 'support@altinsmart.com', // Your SMTP username 
            pass: '87f13c7314a2f1b43a64163cb629f704-b02bcf9f-a51b9450' // Your SMTP password
        }
    });

    // Load the email template using ejs
    const templatePath = path.join(__dirname, 'views', templateFile); // Path to your template file
    const emailTemplate = await ejs.renderFile('./views/email.ejs',  {data})

        // Define email options
        const mailOptions = {
            from: 'support@altinsmart.com',
            to: to.join(','),
            subject: subject,
            html: emailTemplate
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true; // Return true if email is sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Return false if there's an error sending the email
    }
};



const Customerretrievetemaplate = async (req, res, next) => {
    try {
      return res.render('email')
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
};
  
module.exports = {
    Customerretrievetemaplate, sendEmail , sendGroupEmail
}