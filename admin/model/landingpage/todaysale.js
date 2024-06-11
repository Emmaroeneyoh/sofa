const { todaysalemodel } = require("../../core/db/landingpage/todaysale");


const adminaddtodaysaleModel = async (data, res) => {
    try {
      const {
        productid
      } = data;
  
      const form = await new todaysalemodel({
          productid
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
    adminaddtodaysaleModel
  }