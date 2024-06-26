const { CategoryModel } = require("../core/db/category");

const createcategoryModel = async (data, res) => {
  try {
    const { categoryname, categoryurl } = data;

    const form = await new CategoryModel({
      category: categoryname,
      categoryurl,
    });
    const userDetails = await form.save();

    return userDetails;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};

const updatecategoryModel = async (data, res) => {
  try {
    const { categoryname, categoryid, categoryurl } = data;

    const form = await CategoryModel.findByIdAndUpdate(categoryid, {
      $set: {
        category: categoryname,
        categoryurl,
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
  createcategoryModel,
  updatecategoryModel,
};
