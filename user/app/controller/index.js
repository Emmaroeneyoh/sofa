const nodemailer = require("nodemailer");
const { handleError } = require("../../core/utils");

const contactusCONTROLLER = async (req, res) => {
    const { name , companyname , phone ,email , short_description } = req.body;
    try {
      //start of nodemailer
   var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mykcrimecontrol@gmail.com',
  
      pass:'ruqv hpju ncjt pyds',
    },
    tls: {
      rejectUnauthorized: false,
    },
   });
        const contactinfo = `
        NAME : ${name} ,
        COMPANYNAME : ${companyname} ,
        PHONE : ${phone} ,
        EMAIL : ${email} ,
        SHORT DESCRIPTION : ${short_description} ,
        `
    var mailOptions = {
        from: 'emmaroeneyoh@gmail.com',
        to: `emmaroeneyoh@gmail.com`,
        subject: 'CONTACT INFO',
      text: contactinfo
        // html: data,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
                //end of nodemailer
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "mail not sent",
        
        
      });
        } else {
          console.log('Email sent: ' + info.response);
                //end of nodemailer
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "mail sent through",
      });
        }
      });
      //end of nodemailer
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "mail sent through",
        
        
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
const contactus2CONTROLLER = async (req, res) => {
    const { firstname , lastname , state , city , message, phone ,email , subject } = req.body;
    try {
      //start of nodemailer
   var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mykcrimecontrol@gmail.com',
  
      pass:'ruqv hpju ncjt pyds',
    },
    tls: {
      rejectUnauthorized: false,
    },
   });
        const contactinfo = `
        FIRSTNAME : ${firstname} ,
        LASTNAME : ${lastname} ,
        STATE : ${state} ,
        CITY : ${city} ,
        PHONE : ${phone} ,
        EMAIL : ${email} ,
        MESSAGE : ${message} ,
        SUBJECT : ${subject} ,
        `
    var mailOptions = {
        from: 'emmaroeneyoh@gmail.com',
        to: `emmaroeneyoh@gmail.com`,
        subject: 'CONTACT INFO',
      text: contactinfo
        // html: data,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
            //end of nodemailer
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "mail not sent ",
        
        
      });
        } else {
          console.log('Email sent: ' + info.response);
            //end of nodemailer
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "mail sent through",
        
        
      });
        }
      });
    
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  
module.exports = {
    contactusCONTROLLER , contactus2CONTROLLER
}