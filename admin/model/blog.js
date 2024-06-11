const { sellerBlogmodel } = require("../../seller/core/db/blog");

const createadminblogModel = async (data, res) => {
  try {
    const { content, title, media, productad } = data;

    const form = await new sellerBlogmodel({
      content,
      title,
      media,
      productad,
    });
    const productDetails = await form.save();

    return productDetails;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};

const adminretrieveblogModel = async (data, res) => {
  try {
    const { customerid } = data;
    const blogs = await sellerBlogmodel
      .find()
      .populate({ path: "sellerid", select: "name logo" });

    return blogs;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
module.exports = {
  createadminblogModel,
  adminretrieveblogModel
};
