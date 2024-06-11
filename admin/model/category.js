const { CategoryModel } = require("../core/db/category");



const createcategoryModel = async (data, res) => {
    try {
      const {
        categoryname , category_description , categoryurls
      } = data;
  
      const form = await new CategoryModel({
          category: categoryname , category_description , categoryurls
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
  
  const updatecategoryModel = async (data, res) => {
    try {
      const { category_description, categoryname , categoryid  , categoryurls} = data;
  
      const form = await CategoryModel.findByIdAndUpdate(categoryid, {
        $set: {
          category_description , category:categoryname , categoryurls
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
    createcategoryModel ,  updatecategoryModel
  }