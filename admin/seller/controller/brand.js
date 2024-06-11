const { approvebrandModel } = require("../model/brand");



const approvebrandController = async (req, res, next) => {
    const { sellerid,  brandid } = req.body;
    try {
    
  
      const data = {
       brandid
      };
  
      let trainee = await approvebrandModel(data, res);
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
    approvebrandController
}