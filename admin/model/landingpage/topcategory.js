const { TopCategoryModel } = require("../../core/db/landingpage/topcategory");


const createtopcategoryModel = async (data, res) => {
    try {
      const {
        categoryid
      } = data;
  
      const form = await new TopCategoryModel({
          categoryid
      });
      const userDetails = await form.save()
     ;
  
      return userDetails;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  
const deletetopcategoryModel = async (data, res) => {
    try {
      const {
        categoryid
      } = data;
  
      const form = await new TopCategoryModel.findByIdAndDelete(categoryid);
     ;
  
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
module.exports = {
    createtopcategoryModel , deletetopcategoryModel
  }