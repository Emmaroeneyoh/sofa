const { BrandModel } = require("../core/db/brand");


const createbrandModel = async (data, res) => {
    try {
      const {
       brandname , brandurl
      } = data;
  
      const form = await new BrandModel({
         brand:brandname , brandurl
      });
      const userDetails = await form.save()
  
      return userDetails;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
  const updatebrandModel = async (data, res) => {
    try {
      const { brandname , brandid , brandurl} = data;
  
      const form = await BrandModel.findByIdAndUpdate(brandid, {
        $set: {
          brand:brandname , brandurl
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
    createbrandModel ,  updatebrandModel
  }