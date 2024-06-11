const { customer_emailModel } = require("../core/db/confirm.email");
const { CustomerModel } = require("../core/db/customer");
const { WalletModel } = require("../core/db/wallet");
const { create_customer_token } = require("../core/utils");

const CustomerSignupModel = async (data, res) => {
  try {
    const {
      country,
      customerEmail,
      Harshpassword,
      phone, code , name
     
    } = data;
    const form = await new CustomerModel ({
        country,
        email:customerEmail,
       password : Harshpassword,
        phone, name
    });
   
    const userDetails = await form.save()
   const updatecode = await CustomerModel.findByIdAndUpdate(userDetails._id, {
    $set: {
      'auth.auth_code': code,
    },
  });


return 'please check email for code';
  } catch (error) {
    console.log('error' , error);
    return error.message;
   
  }
};
const CustomersendconfirmemailModel = async (data, res) => {
  try {
    const {
     email , code
     
    } = data;
    console.log('posi')
    const checkemail = await customer_emailModel.findOne({ email })
    console.log('user' , checkemail)
    if (checkemail) {
      const updatecode = await customer_emailModel.findOneAndUpdate({email}, {
        $set: {
          code
        },
      });

      return 'success'
    }
    const form = await new customer_emailModel ({
       email , code
    });
   
    const userDetails = await form.save()
   
    return 'success'
  } catch (error) {
    console.log('error' , error);
    return error.message;
   
  }
};



const CustomerLoginModel = async (data,res) => {
  try {
    const { customerEmail, } = data
     const userDetails = await CustomerModel.findOne({ email:customerEmail});
    const token = create_customer_token(userDetails._id)
    const customerid = userDetails._id
    const customerwallet = await WalletModel.findOne({customerid})
     const userData = {
         id: userDetails._id,
         name: userDetails.name,
         email: userDetails.email,
         token, customerwallet
      }
   
     return userData
  } catch (error) {
      return error.message
  }
     
 }
module.exports = {
    CustomerSignupModel , CustomerLoginModel , CustomersendconfirmemailModel
}