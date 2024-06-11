const { packageModel } = require("../core/db/package");


const createpackageModel = async (data, res) => {
    try {
      const {
        logo , packageName , amount , upload_limit , commission  , number
      } = data;
  
      const form = await new packageModel({
        logo , packagename : packageName  , amount , upload_limit , commission  , number
      });
      const userDetails = await form.save()
  
      return userDetails;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
  const updatepackageModel = async (data, res) => {
    try {
      const { logo , packageName , amount , upload_limit , commission  , packageid , number} = data;
  
      const form = await packageModel.findByIdAndUpdate(packageid, {
        $set: {
            logo , packagename  : packageName, amount , upload_limit , commission  , number
        },
      });
  
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
module.exports = {
    createpackageModel ,  updatepackageModel
  }