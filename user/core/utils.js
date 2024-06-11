const jwt = require("jsonwebtoken");
const { customerjwt } = require("../../helper/utils");
//create jwt token for users when the signup or login
const age = Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60;
// const age = 1 * 24 * 60 * 60;
const create_customer_token = (user) => {
  return jwt.sign({ user }, customerjwt, {
    expiresIn: age,
  });
};
const handleError = (err) => (res) => {
  return res.status(400).json({
    status_code: 400,
    status: false,
    message: err,
    data: [],
    error: err,
  });
};

// handling error based on objects or string
const checkdata = (data, res) => {
  if (typeof data !== "object") {
    console.log("error occured");
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: data,
      error: data,
    });
  }
};

const crypto = require("crypto");
const { CustomerModel } = require("./db/customer");
const { customerordermodel } = require("./db/order");

// Encryption
function encryptcard(value, secretKey) {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(value, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption
function decryptcard(encryptedValue, secretKey) {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedValue, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

function generateRandomNumber(length) {
  let result = "";
  const characters = "0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  // Parse the result as an integer before returning
  return parseInt(result, 10);
}

//generate order tracking id and ensure the the order tracking id doesnt exist
const generateuserauthcode = async () => {
  let id = generateRandomNumber(5);
  console.log(id);
  let checkid = await CustomerModel.findOne({ "auth.auth_code": id });
  let counter = 0;
  while (checkid) {
    counter++;
    console.log("count :", counter);
    id = generateRandomNumber(6);
    console.log("new id", id);
    checkid = await CustomerModel.findOne({ "auth.auth_code": id });
  }
  return id;
};


function generateRandomNumber(length) {
  let result = "";
  const characters = "0123456789";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  // Parse the result as an integer before returning
  return parseInt(result, 10);
}

const generateordercode = async () => {
  let id = generateRandomNumber(5);
  console.log(id);
  let checkid = await customerordermodel.findOne({ trackingid: id });
  let counter = 0;
  while (checkid) {
    counter++;
    console.log("count :", counter);
    id = generateRandomNumber(6);
    console.log("new id", id);
    checkid = await customerordermodel.findOne({ trackingid: id });
  }
  return id;
};

module.exports = {
  create_customer_token,
  handleError,
  checkdata,
  decryptcard,
  encryptcard, generateuserauthcode , generateordercode , generateRandomNumber
};
