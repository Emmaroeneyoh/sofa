const { emailsubscriptionModel } = require("../core/db/productnotification");


const CustomermailsubscribtionModel = async (data, res) => {
    try {
      const {
        customerEmail,
      
       
      } = data;
      const form = await new emailsubscriptionModel ({
        
          email:customerEmail,
         
      });
     
      const userDetails = await form.save()
    
  
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
  };
  
module.exports = {
    CustomermailsubscribtionModel
  }