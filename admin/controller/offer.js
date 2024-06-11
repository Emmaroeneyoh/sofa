const { offerModel } = require("../core/db/offer");
const { createofferModel, updateofferModel, updateofferstatusModel } = require("../model/offer");

const createofferController = async (req, res, next) => {
  const { title, start_date, end_date, package, offertype, banner, product , seller } =
    req.body;
  const tilename = title.toLowerCase();
  try {
    const cat = await offerModel.findOne({ title: tilename });
    if (cat) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "offer already exist",
        data: [],
        error: "offer already exist",
      });
    }

    const data = {
      start_date,
      end_date,
      package,
      offertype,
      tilename,
      banner,
      product, seller
    };

    let trainee = await createofferModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const updateofferController = async (req, res, next) => {
  const { title, end_date, offerid, banner, start_date } = req.body;
  try {
    const data = {
      end_date,
      title,
      offerid,
      banner,
      start_date,
    };

    let trainee = await updateofferModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const updateofferstatusController = async (req, res, next) => {
  const { offerid, status } = req.body;
  try {
    const data = {
      status ,
      offerid,
    };

    let trainee = await updateofferstatusModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const retrievesingleofferController = async (req, res, next) => {
  const { offerid } = req.body;
  try {
    let trainee = await offerModel.findById(offerid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const deletesingleofferController = async (req, res, next) => {
  const { offerid } = req.body;
  try {
    let trainee = await offerModel.findByIdAndDelete(offerid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const retrieveallofferController = async (req, res, next) => {
  try {
    let trainee = await offerModel.find().populate([
      { path: 'product' },
      { path: 'seller' },
      { path: 'package' }
  ])
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

module.exports = {
  retrieveallofferController,
  createofferController,
  updateofferController,
  deletesingleofferController,
  retrievesingleofferController, updateofferstatusController
};
