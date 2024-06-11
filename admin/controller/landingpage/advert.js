const { advertmodel } = require("../../core/db/landingpage/advert");
const { adminaddadvertModel } = require("../../model/landingpage/advert");

const adminadvertoController = async (req, res, next) => {
  const { contentid, image, contenttype } = req.body;
  try {
    const checkbrand = await advertmodel.findOne({ contentid });
    if (checkbrand) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "store already featured",
        error: "store already featured",
      });
    }

    const data = {
      contentid,
      image,
      contenttype,
    };

    let trainee = await adminaddadvertModel(data, res);
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
const adminupdateadvertController = async (req, res, next) => {
  const { contentid, image, contenttype , advertid} = req.body;
  try {
      const checkbrand = await advertmodel.findByIdAndUpdate(advertid, {
        $set : {contentid, image, contenttype }
    });
   

    const data = {
      contentid,
      image,
      contenttype,
    };

    let trainee = await adminaddadvertModel(data, res);
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

const adminretrieveadvertController = async (req, res, next) => {
  try {
    const brand = await advertmodel.find();

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
const admindeleteadvertController = async (req, res, next) => {
  try {
    const { advertid } = req.body;
    const brand = await advertmodel.findByIdAndDelete(advertid);

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

module.exports = {
  admindeleteadvertController,
  adminretrieveadvertController,
  adminadvertoController,  adminupdateadvertController
};
