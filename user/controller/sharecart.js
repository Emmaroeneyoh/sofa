const { appPassword } = require("../../helper/utils");
const { sharecartmodel } = require("../core/db/sharecart");
const { customersharecartModel } = require("../model/sharecart");
const nodemailer = require("nodemailer");

const CustomersharecartController = async (req, res, next) => {
    const {  cart , price} =
      req.body;
    try {
      const data = {
         cart , price
      };
      let comment = await customersharecartModel(data, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "cart code generated",
        data: comment,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
const CustomerretrievesharecartController = async (req, res, next) => {
    const { bookingcode } =
      req.body;
    try {
     
      let comment = await sharecartmodel.findOne({ bookingcode })
      if (comment.cartexpired) {
        return res.status(200).json({
          status_code: 200,
          status: true,
          message: "cart code expired",
        });
      }
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully retrieved",
        data: comment,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  


const customersendcartController = async (req, res, next) => {
  const {  email, bookingcode } = req.body;

  try {
  
       //start of nodemailer email verification
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
        text: `${bookingcode}`,
        // html: data,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(400).json({
                status_code: 400,
                status: false,
                message: "email email account not verified",
                data: [],
                error: "email email account not verified",
              });
        } else {
            console.log('succes :' )
        }
      });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code sent",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
module.exports = {
    CustomersharecartController , CustomerretrievesharecartController , customersendcartController
}