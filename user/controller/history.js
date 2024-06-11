const { reorderhistorymodel } = require("../core/db/reorderhistory");
const { viewhistorymodel } = require("../core/db/viewhistory");

const CustomercreateviewhistoryController = async (req, res, next) => {
  const { customerid, productid } = req.body;
    try {
        const findproduct = await viewhistorymodel.findOne({ customerid, productid })
        if (findproduct) {
            return res.status(400).json({
                status_code: 400,
                status: true,
                message: "already exist",
              });
        }
    const form = await new viewhistorymodel({
      customerid,
      productid,
    });

    const useraddress = await form.save();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: form,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerretrieveviewhistoryController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const form = await viewhistorymodel.find({ customerid }).populate('productid')

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: form,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomercreatereorderhistoryController = async (req, res, next) => {
  const { customerid, productid } = req.body;
    try {
        const findproduct = await reorderhistorymodel.findOne({ customerid, productid })
        if (findproduct) {
            return res.status(400).json({
                status_code: 400,
                status: true,
                message: "already exist",
              });
        }
    const form = await new reorderhistorymodel({
      customerid,
      productid,
    });

    const useraddress = await form.save();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: form,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerretrievereorderhistoryController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const form = await reorderhistorymodel.find({ customerid }).populate('productid')

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: form,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  CustomerretrievereorderhistoryController,
  CustomercreatereorderhistoryController,
  CustomerretrieveviewhistoryController,
  CustomercreateviewhistoryController,
};
