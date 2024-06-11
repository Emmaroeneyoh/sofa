const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { CustomerModel } = require("../core/db/customer");
const { customerpasswordjwt, appPassword } = require("../../helper/utils");
const {
  CustomerSignupModel,
  CustomerLoginModel,
  CustomersendconfirmemailModel,
} = require("../model/auth");
const { checkdata, handleError, generateuserauthcode } = require("../core/utils");
const { generateRandomString } = require("../../rider/core/utils");
const {
  adminResetpasswordValidation,
} = require("../../admin/core/validation/auth");
const { customer_emailModel } = require("../core/db/confirm.email");
const { WalletModel } = require("../core/db/wallet");
const { sendEmail }= require("../../helper/email");

const CustomerSignupController = async (req, res, next) => {
  const { country, email, password, phone, name } = req.body;
  const customerEmail = email.toLowerCase();
  const code = await generateuserauthcode()
  try {
//check if the email is veirifed 
const customer = await CustomerModel.findOne({ email: customerEmail });
if (customer && customer.auth.auth_verified) {
  return res.status(400).json({
    status_code: 400,
    status: false,
    message: "email already exist",
    data: [],
    error: "email already exist",
  });
} 
const templateFile = 'signin.ejs'
const subject ="Verification email"
sendEmail(email , subject , templateFile , code)
    //end of verification email
if (customer && !customer.auth.auth_verified) {
      //update the user code so you can verify him
await CustomerModel.findByIdAndUpdate(customer._id, {
    $set: {
      'auth.auth_code': code,
    },
  });
      return res.status(200).json({
        status_code: 200,
        status: false,
        message: "check your email",
      });
    }
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const data = {
      customerEmail,
      country,
      Harshpassword,
      phone, code , name
    };

    let trainee = await CustomerSignupModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const customerEmail = email.toLowerCase();
  try {
    const customerDetails = await CustomerModel.findOne({
      email: customerEmail,
    });
    if (!customerDetails) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "user dont exist on our application",
        data: [],
        error: "user dont exist on our application",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      customerDetails.password
    );
    if (!checkPassword) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect password",
        data: [],
        error: "incorrect password",
      });
    }
    const data = {
      customerEmail,
      password,
    };

    let trainee = await CustomerLoginModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

  const CustomerNewPasswordLink = async (req, res) => {
    const { email } = req.body;
    console.log('polwoiakjs')
    const useremail = email.toLowerCase();
    try {
      const client = await CustomerModel.findOne({ email: useremail });
  
      if (!client) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "incorrect email",
          error: "incorrect email",
        });
      }
      //function to generate token
      const secret = customerpasswordjwt;
      const payload = {
        email: useremail,
        id: client._id,
      };
      const riderid = client._id;
      const token = jwt.sign(payload, secret, { expiresIn: "50m" });
      const code = await generateuserauthcode()
      //updating the user auth
      const form = await CustomerModel.findByIdAndUpdate(riderid, {
        $set: {
          auth: { auth_token: token, auth_code: code, auth_verified: true },
        },
      });
  
     
      const templateFile = "customer.forgot.ejs";
      const subject = "Reset Password";
      sendEmail(email, subject, templateFile, code);
      
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "mail sent through",
      });
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
  };


const Customersendconfirmemailcontroller = async (req, res) => {
  const { email } = req.body;
  try {
    const code = generateRandomString(5);
    const data = { email, code };
    const sendemail = await CustomersendconfirmemailModel(data, res);
    //start of nodemailer
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emmaroeneyoh@gmail.com",

        pass: appPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "emmaroeneyoh@gmail.com",
      to: `${email}`,
      subject: "Nodemailer Project",
      text: `${code}`,
      // html: data,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
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
    return handleError(error.message)(res);
  }
};
const Customerconfirmemailcontroller = async (req, res) => {
  const {  code } = req.body;
  try {
    
      const checkcode = await CustomerModel.findOne({ 'auth.auth_code': code });
      console.log('code', code , checkcode)
    if (!checkcode ) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "wrong code ",
      });
    }
    const email = checkcode.email
      if (checkcode.auth.auth_verified) {
          return res.status(400).json({
              status_code: 400,
              status: true,
              message: "email already verified",
            });
      }
     //update the email to true
     const updatecode = await  CustomerModel.findOneAndUpdate({email}, {
      $set: {
         'auth.auth_verified': true
      },
     });
      //     //create user wallet
  const wallet =   await new WalletModel ({
    customerid : checkcode._id
    
  });
    const userwallet = await wallet.save()
    const templateFile = 'customer.welcome.ejs'
    const nothing = 'poil'
const subject ="Verification Successful"
sendEmail(email , subject , templateFile , nothing)
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "successss",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};


  const CustomerresetPassword = async (req, res) => {
    try {
      const { code, password } = req.body;
      console.log(code);
      const rider = await CustomerModel.findOne({ "auth.auth_code": code });
      if (!rider) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "invalide code",
          error: "invalide code",
        });
      }
      const verifiedToken = jwt.verify(rider.auth.auth_token, customerpasswordjwt);
      if (!verifiedToken) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "code expire , generate new code",
          error: "code expire , generate new code",
        });
      }
  
      const salt = await bcrypt.genSalt();
      const Harshpassword = await bcrypt.hash(password, salt);
      const id = rider._id;
      const updateclient = await CustomerModel.findByIdAndUpdate(id, {
        $set: {
          password: Harshpassword,
        },
      });
      //   const datad = { notification: 'you have successfully updated your profile', traineeId }
      //   await notificationModel(datad)
      if (!updateclient) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "cant update password",
          error: "cant update password",
        });
      }
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "user password updated",
      });
    } catch (error) {
      console.log(error);
  
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "token has expired",
        data: [],
        error: "token has expired",
      });
    }
  };

const mobilecustomerNewPasswordLink = async (req, res) => {
  const { email } = req.body;
  const useremail = email.toLowerCase();
  try {
    const client = await CustomerModel.findOne({ email: useremail });

    if (!client) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect email",
        error: "incorrect email",
      });
    }
    //function to generate token
    const secret = customerpasswordjwt;
    const payload = {
      email: useremail,
      id: client._id,
    };
    const riderid = client._id;
    const token = jwt.sign(payload, secret, { expiresIn: "50m" });
    const code = generateRandomString(6);
    //updating the user auth
    const form = await CustomerModel.findByIdAndUpdate(riderid, {
      $set: {
        auth: { auth_token: token, auth_code: code },
      },
    });

    const link = `code ${code}`;

    //start of nodemailer
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emmaroeneyoh@gmail.com",

        pass: appPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "emmaroeneyoh@gmail.com",
      to: `${email}`,
      subject: "Nodemailer Project",
      text: `${link}`,
      // html: data,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
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
    return handleError(error.message)(res);
  }
};

const mobilecustomerresetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;
    console.log(code);
    const rider = await CustomerModel.findOne({ "auth.auth_code": code });
    console.log("rider", rider);
    if (!rider) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "invalide code",
        error: "invalide code",
      });
    }
    const verifiedToken = jwt.verify(
      rider.auth.auth_token,
      customerpasswordjwt
    );
    if (!verifiedToken) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "code expire , generate new code",
        error: "code expire , generate new code",
      });
    }

    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const id = rider._id;
    const updateclient = await CustomerModel.findByIdAndUpdate(id, {
      $set: {
        password: Harshpassword,
      },
    });
    //   const datad = { notification: 'you have successfully updated your profile', traineeId }
    //   await notificationModel(datad)
    if (!updateclient) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "cant update password",
        error: "cant update password",
      });
    }
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "user password updated",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status_code: 400,
      status: false,
      message: "token has expired",
      data: [],
      error: "token has expired",
    });
  }
};
module.exports = {
  CustomerSignupController,
  CustomerLoginController,
  CustomerNewPasswordLink,
  CustomerresetPassword,
  mobilecustomerresetPassword,
  mobilecustomerNewPasswordLink,
  Customersendconfirmemailcontroller,
  Customerconfirmemailcontroller,
};
