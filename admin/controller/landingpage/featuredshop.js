const { SellerModel } = require("../../../seller/core/db/seller");
const { featuredshopmodel } = require("../../core/db/landingpage/featuredshop");
const {
  adminaddfeaturedshopModel,
} = require("../../model/landingpage/featuredshop");

const adminaddfeatureshoController = async (req, res, next) => {
  const { sellerid } = req.body;
  try {
    const checkbrand = await featuredshopmodel.findOne({ sellerid });
    if (checkbrand) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "store already featured",
        error: "store already featured",
      });
    }

    const data = {
      sellerid,
    };

    let trainee = await adminaddfeaturedshopModel(data, res);
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

const adminretrievefeaturedshopController = async (req, res, next) => {
  const { sellerid } = req.body;
  try {
    const brand = await SellerModel.findById(sellerid);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const adminretrieveallfeaturedshopController = async (req, res, next) => {
  try {
    const cat = await featuredshopmodel.find().populate({
      path: "sellerid",
      select: "name",
    });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const admindeletefeaturedController = async (req, res, next) => {
  const { featuredshopid } = req.body;
  try {
    let trainee = await featuredshopmodel.findByIdAndDelete(featuredshopid);
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
  adminretrieveallfeaturedshopController,
  adminretrievefeaturedshopController,
  adminaddfeatureshoController, admindeletefeaturedController
};
