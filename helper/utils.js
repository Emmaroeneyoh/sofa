const base_url = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const customerjwt = process.env.customerJWT;
const customerpasswordjwt = process.env.customerpasswordjwt;
const sellerJWT = process.env.sellerJWT;
const sellerpasswordjwt = process.env.sellerpasswordjwt;
const riderJWT = process.env.riderJWT;
const riderpasswordjwt = process.env.riderpasswordjwt;
const adminJWT = process.env.adminJWT;
const adminpasswordjwt = process.env.adminpasswordjwt;
const appPassword = process.env.appPassword;
const databaseliveurl = process.env.databaseliveurl;
const databasetesturl = process.env.databasetesturl;
const cardsecret = process.env.cardsecret;


module.exports = {
  base_url,
  PORT,
  customerjwt,
  customerpasswordjwt,
  riderJWT,
  riderpasswordjwt,
  sellerJWT,
  sellerpasswordjwt, adminJWT , adminpasswordjwt ,
  appPassword,cardsecret , databasetesturl , databaseliveurl
};
