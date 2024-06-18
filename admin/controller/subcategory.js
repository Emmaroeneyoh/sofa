const { subcategoryModel } = require("../core/db/subcategory");
const { handleError } = require("../core/utils");
const { createsubcategoryModel } = require("../model/subcategory");




const createsubcategoryController = async (req, res, next) => {
  const {  subcategory , category} = req.body;
  const categoryname = category.toLowerCase();
  try {
    // const cat = await CategoryModel.findOne({ category: categoryname });
    // if (cat) {
    //   return res.status(400).json({
    //     status_code: 400,
    //     status: false,
    //     message: "category already exist",
    //     data: [],
    //     error: "category already exist",
    //   });
    // }

    const data = {
        subcategory , category
    };

    let trainee = await createsubcategoryModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const retrievesinglesubcategoryController = async (req, res, next) => {
  const { subcategoryid } = req.body;
  try {
    const cat = await subcategoryModel.findById(subcategoryid);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const deletesubcategoryController = async (req, res, next) => {
  const { subcategoryid } = req.body;
  try {
    const cat = await subcategoryModel.findByIdAndDelete(subcategoryid);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const retrieveallsubcategoryController = async (req, res, next) => {
    try {
      const {category}  = req.body
    const cat = await subcategoryModel.find({category});

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const retrievesubcategoriesController = async (req, res, next) => {
    try {
    const cat = await subcategoryModel.find()

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const updatesubcategoryController = async (req, res, next) => {
    const {  category, subcategory  , subcategoryid} = req.body;
    const ncategory = subcategory.toLowerCase();
    // const sellercategory = await CategoryModel.findOne({
    //   category: ncategory,
    // });
    //   if (sellercategory) {
    //     return res.status(400).json({
    //       status_code: 400,
    //       status: false,
    //       message: "category already exist",
    //       error: "category already exist",
    //     });
    //   }
  
    try {
      const form = await subcategoryModel.findByIdAndUpdate(subcategoryid, {
        $set: {
            category, subcategory : nsubcategory
        },
      });
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
  };

module.exports = {
  createsubcategoryController,
  updatesubcategoryController,
  deletesubcategoryController,
  retrieveallsubcategoryController,
  retrievesinglesubcategoryController,   retrievesubcategoriesController
};
