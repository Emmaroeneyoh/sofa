const { customerordermodel } = require("../../customer/core/db/order");
const { sellerordermodel } = require("../../seller/core/db/order");
const { createadminblogModel, adminretrieveblogModel } = require("../model/blog");


const AdminaddblogController = async (req, res, next) => {
  const { content, title, media, productad } = req.body;
  try {
    const data = {
      content,
      title,
      media,
      productad,
      };
   
    let trainee = await createadminblogModel(data, res);
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



const AdminretrieveallblogController = async (req, res, next) => {
  const { start_date, stop_date , blogid } = req.body;
    try {
        var query = { $and: [] };
    const data = {
        query
    };
        let trainee = await adminretrieveblogModel(data, res);
       
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


module.exports = {
    AdminretrieveallblogController , AdminaddblogController
}