const { TopCategoryModel } = require("../../core/db/landingpage/topcategory");
const { createtopcategoryModel, deletetopcategoryModel } = require("../../model/landingpage/topcategory");

const createtopcategoryController = async (req, res, next) => {
    const { categoryid} = req.body;
    try {
      const data = {
        categoryid
      };
  
      let trainee = await createtopcategoryModel(data, res);
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
  
const deletetopcategoryController = async (req, res, next) => {
    const { categoryid} = req.body;
    try {
      const data = {
        categoryid
      };
  
      let trainee = await deletetopcategoryModel(data, res);
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
  
const retrievetopcategoryController = async (req, res, next) => {
    try {
  
      let trainee = await TopCategoryModel.find();
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
    retrievetopcategoryController , createtopcategoryController , deletetopcategoryController
  }