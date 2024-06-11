const { WalletModel } = require("../../customer/core/db/wallet");
const { customerfundwalletModel, customerpaywithcardModel } = require("../../customer/model/wallet");
const { paymentplatformmodel } = require("./core/finance.db");



function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
}

// Generate a random ID with length 8
const randomId = generateRandomId(8);

async function createstripeCheckoutSession(usertype, customerid, amount, cardpayment , platformNumber) {
  try {
    const stripeapi = await paymentplatformmodel.findOne({ platformNumber })
    const apikey = stripeapi.apikey
    const stripe = require("stripe")(
      apikey
    );
    const transref = randomId
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "altinsmart",
              // Add more product details if needed
            },
            unit_amount: amount *100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://smartbestaltinsmart-6531be84644c.herokuapp.com/customer/fund/wal",
      cancel_url: "https://smartbestaltinsmart-6531be84644c.herokuapp.com/customer/fund/wal",
      metadata: {
        usertype, customerid, amount, cardpayment ,  transref
      },
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

// Example usage




//4242 4242 4242 4242

const stripewebhookController = async (req, res, next) => {
   
  try {
    const event = req.body
    const session = event.data.object;
    const metadata = session.metadata;
    const transid = session.payment_intent;
      const status = session.payment_status;
    const { usertype, customerid, amount, cardpayment, transref } = metadata
    console.log('this is metad' , typeof cardpayment)
    
//for card payment  
    const iscard = Boolean(cardpayment)
    if (iscard === true) {
  console.log('card oayment for card', cardpayment)
  if (usertype == 'user') {
    const userid = customerid
    const wallet = await WalletModel.findOne({ customerid: userid })
    const walletid = wallet._id
    const platform = 'stripe'
    const datas = {
      userid,
      walletid,
      amount,
      status, transid , transref , cardpayment , platform
    };
    let comment = await customerpaywithcardModel(datas, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully "
    });
  } 
}


//for funding wallet
if (usertype == 'user') {
  const userid = customerid
  console.log('customerid' , customerid)
  const wallet = await WalletModel.findOne({ customerid: userid })
  const walletid = wallet._id
  const platform = 'stripe'
  const datas = {
    userid,
    walletid,
    amount,
    status, transid , transref , cardpayment , platform
  };
  let comment = await customerfundwalletModel(datas, res);
  return res.status(200).json({
    status_code: 200,
    status: true,
    message: "customer successfully "
  });
} 
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
};
  

module.exports = {
  stripewebhookController , createstripeCheckoutSession
}