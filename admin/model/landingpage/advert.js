const { advertmodel } = require("../../core/db/landingpage/advert");


const adminaddadvertModel = async (data, res) => {
    try {
      const {
        contentid , image , contenttype
      } = data;
  
      const form = await new advertmodel({
        contentid , image , contenttype
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

module.exports = {
    adminaddadvertModel
}