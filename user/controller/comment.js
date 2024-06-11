const { SellerModel } = require("../../seller/core/db/seller");
const { customerordermodel } = require("../core/db/order");
const {
  customeraddcommentModel,
  customerreactcommentModel,
  customerdeletecommentModel,
  customeraddreplyModel,
  customerreactreplyModel,
  customerdeletereplyModel,
  customerretrieveblogModel,
  customerretrievesingleblogModel,
  customerretrievesinglecommentModel,
  customerreactblogModel,
  customerretrievesellerblogModel,
} = require("../model/comment");

const CustomerretrieveallblogController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid,
      };
   
    let comment = await customerretrieveblogModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const CustomerretrievesellerblogController = async (req, res, next) => {
  const { customerid, sellerid } = req.body;
  try {
    const data = {
      customerid,
      sellerid,
    };
    let comment = await customerretrievesellerblogModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const CustomerretrievesellernameblogController = async (req, res, next) => {
  const { customerid, sellername } = req.body;
  try {
    const name = sellername.toLowerCase();
    const seller = await SellerModel.findOne({ name });
    if (!seller) {
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "Seller does not exist",
      });
    }
    const sellerid = seller._id;
    const data = {
      customerid,
      sellerid,
    };
    let comment = await customerretrievesellerblogModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomerretrievesingleblogController = async (req, res, next) => {
  const { blogid, customerid } = req.body;
  try {
    const data = {
      blogid,
      customerid,
    };
    let comment = await customerretrievesingleblogModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomerreactblogController = async (req, res, next) => {
  const { blogid, customerid } = req.body;
  try {
    const data = {
      blogid,
      customerid,
    };
    let comment = await customerreactblogModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomerretrievesinglecommentController = async (req, res, next) => {
  const { commentid, customerid } = req.body;
  try {
    const data = {
      commentid,
      customerid,
    };
    let comment = await customerretrievesinglecommentModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomeraddcommentController = async (req, res, next) => {
  const { comment, customerid, blogid } = req.body;
  try {
    const data = {
      comment,
      customerid,
      blogid,
    };
    let commentdata = await customeraddcommentModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: commentdata,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const CustomerreactcommentController = async (req, res, next) => {
  const { commentid, customerid } = req.body;
  try {
    const data = {
      commentid,
      customerid,
    };
    let comment = await customerreactcommentModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const CustomerdeletecommentController = async (req, res, next) => {
  const { blogid, commentid } = req.body;
  try {
    const data = {
      blogid,
      commentid,
    };
    let comment = await customerdeletecommentModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const CustomeraddreplyController = async (req, res, next) => {
  const { reply, commentid, customerid, blogid } = req.body;
  try {
    const data = {
      reply,
      commentid,
      customerid,
      blogid,
    };
    let comment = await customeraddreplyModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const CustomerreactreplyController = async (req, res, next) => {
  const { replyid, customerid } = req.body;
  try {
    const data = {
      replyid,
      customerid,
    };
    let comment = await customerreactreplyModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomerdeletereplyController = async (req, res, next) => {
  const { blogid, replyid, commentid } = req.body;
  try {
    const data = {
      blogid,
      replyid,
      commentid,
    };
    let comment = await customerdeletereplyModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  CustomeraddcommentController,
  CustomerreactcommentController,
  CustomerdeletecommentController,
  CustomeraddreplyController,
  CustomerreactreplyController,
  CustomerdeletereplyController,
  CustomerretrieveallblogController,
  CustomerretrievesingleblogController,
  CustomerretrievesinglecommentController,
  CustomerreactblogController,
  CustomerretrievesellerblogController,
  CustomerretrievesellernameblogController,
};
