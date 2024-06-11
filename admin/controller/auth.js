const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../core/db/admin");
const { AdminSignupModel, AdminLoginModel } = require("../model/auth");


const AdminSignupController = async (req, res, next) => {
  const {name, email, password, phone ,  } = req.body;
  const adminEmail = email.toLowerCase();
  try {
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const admin = await AdminModel.findOne({ email: adminEmail });
    if (admin) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "email already exist",
        data: [],
        error: "email already exist",
      });
    }

    const data = {
      adminEmail,
      name,
      Harshpassword,
      phone, 
    };

    let trainee = await AdminSignupModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const AdminLoginController = async (req, res, next) => {
  const { email, password } = req.body;
  const adminEmail = email.toLowerCase();
  try {
    const customerDetails = await AdminModel.findOne({ email: adminEmail });
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
      adminEmail,
      password,
    };

    let trainee = await AdminLoginModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
      error: {},
    });
  } catch (error) {
    console.log(error);
  }
};

const AdminNewPasswordLink = async (req, res) => {
  const { email } = req.body;
  const useremail = email.toLowerCase();
  try {
    const client = await AdminModel.findOne({ email: useremail });
    if (!client) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect email",
        error: "incorrect email",
      });
    }
    //function to generate token
    const secret = 'customerforgot';
    const payload = {
      email: useremail,
      id: client._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "50m" });

    const link = `https://dev-myt-page.netlify.app/reset_password/?token=${token}`;

    //start of nodemailer
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "emmaroeneyoh@gmail.com",

        pass: 'jcgorckqvxpwcaut',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var mailOptions = {
      from: "emmaroeneyoh@gmail.com",
      to: `${email}`,
      subject: "Nodemailer Project",
      text: `${token}`,
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
  }
};

const AdminresetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const secret = 'customerforgot'
    const verifiedToken = jwt.verify(token, secret);
    // console.log(verifiedToken.id)
    const id = verifiedToken.id;

    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(password, salt);
    const updateclient = await AdminModel.findByIdAndUpdate(id, {
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

const adminretrieveprofileController = async (req, res, next) => {
  const { adminid } = req.body;
  try {
    const cat = await AdminModel.findById(adminid);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
module.exports = {
  AdminSignupController,
  AdminLoginController,
  AdminNewPasswordLink,
  AdminresetPassword, adminretrieveprofileController
};
