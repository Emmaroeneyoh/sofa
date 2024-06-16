const { subcategoryModel } = require("../core/db/subcategory");

const createsubcategoryModel = async (data, res) => {
  try {
    const { subcategory, category } = data;

    const form = await new subcategoryModel({
        subcategory, category
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
  createsubcategoryModel,
//   updatecategoryModel,
};
