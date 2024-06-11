const { featuredshopmodel } = require("../../core/db/landingpage/featuredshop");
const { TopCategoryModel } = require("../../core/db/landingpage/topcategory");


const adminaddfeaturedshopModel = async (data, res) => {
    try {
      const {
        sellerid
      } = data;
  
      const form = await new featuredshopmodel({
          sellerid
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
  
const admindeletefeaturedshopModel = async (data, res) => {
    try {
      const {
        sellerid
      } = data;
  
      const form = await new featuredshopmodel.findByIdAndDelete(sellerid);
     ;
  
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
module.exports = {
    admindeletefeaturedshopModel ,  adminaddfeaturedshopModel
  }