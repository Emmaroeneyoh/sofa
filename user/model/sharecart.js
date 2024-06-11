const { calculate48HoursFromNow } = require("../../helper/sharecarttime");
const { sharecartmodel } = require("../core/db/sharecart");


const customersharecartModel = async (data, res) => {
    try {
        const {  cart , price } = data;
         //generate tracking id 
      function generatebookingcode() {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        const sixDigitString = randomNumber.toString();
        return sixDigitString;
      }
      const track = generatebookingcode();
      const  expiredtime = calculate48HoursFromNow()
      const form = await new sharecartmodel({
         cart , bookingcode : track , price , expiredtime 
      });
  
      const useraddress = await form.save();
      return track;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
}

module.exports = {
    customersharecartModel
}