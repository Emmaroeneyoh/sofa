const { BrandModel } = require("../../admin/core/db/brand");
const { CategoryModel } = require("../../admin/core/db/category");
const { advertmodel } = require("../../admin/core/db/landingpage/advert");
const {
  featuredshopmodel,
} = require("../../admin/core/db/landingpage/featuredshop");
const { flashsalemodel } = require("../../admin/core/db/landingpage/flashsale");
const { todaysalemodel } = require("../../admin/core/db/landingpage/todaysale");
const { offerModel } = require("../../admin/core/db/offer");
const { ProductModel } = require("../../seller/core/db/product");
const { SellerModel } = require("../../seller/core/db/seller");
const { CustomerModel } = require("../core/db/customer");
const { reorderhistorymodel } = require("../core/db/reorderhistory");
const { viewhistorymodel } = require("../core/db/viewhistory");
const { handleError } = require("../core/utils");
const { CustomermailsubscribtionModel } = require("../model/landingpage");

const retrievetopcatgeriesController = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find().sort({
      product_purchased: -1,
    });

    const calender = new Date();
    const olddate = new Date(calender);
    // const year = calender.getFullYear()
    // const month = calender.getMonth()
    // const currrentdate = `${year}-${month}-25T15:27:03.146+00:00`
    const setdate = olddate.setDate(calender.getDate() - 1);
    const todaydeel = await CategoryModel.find({
      createdAt: {
        $gte: setdate,
      },
    });
    console.log("deal", setdate, todaydeel);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};

const userretrieveallbrandController = async (req, res, next) => {
  try {
    const brand = await SellerModel.find().select("logo photo");
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};
const userretrievecategoryController = async (req, res, next) => {
  try {
    const brand = await CategoryModel.find();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};
const userretrieveflashsalesController = async (req, res, next) => {
  try {
    const flashsale = await ProductModel.find();
    // const flashsale = await flashsalemodel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: flashsale,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};
const retrievealtinsmartproductController = async (req, res, next) => {
  try {
    const flashsale = await ProductModel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: flashsale,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};
const retrievetodaydealsController = async (req, res, next) => {
  try {
    const flashsale = await ProductModel.find();
    // const flashsale = await todaysalemodel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: flashsale,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};
const retrievealladvertController = async (req, res, next) => {
  try {
    const flashsale = await advertmodel.find();
    // const flashsale = await todaysalemodel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: flashsale,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};

const retrieveallofferController = async (req, res, next) => {
  try {
    const { customerid } = req.body;
    let offers = await offerModel.find().populate("seller").populate("product");
    let viewhistory = [];
    let reorderhistory = [];

    if (customerid !== "") {
      viewhistory = await viewhistorymodel
        .find({ customerid })
        .populate("productid");
      console.log("viewhistory", viewhistory);
      reorderhistory = await reorderhistorymodel
        .find({ customerid })
        .populate("productid");
      console.log("order history", reorderhistory);
    }

    // Add viewhistory and reorderhistory as separate properties in the offers array
    offers.push(
      { viewhistory: viewhistory, title: "viewhistory" },
      { reorderhistory: reorderhistory, title: "reorder" }
    );

    // const flashsale = await todaysalemodel.find();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: offers,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};

const retrievesingleofferController = async (req, res, next) => {
  try {
    const { offerid } = req.body;
    const flashsale = await offerModel
      .findById(offerid)
      .populate("seller")
      .populate("product");
    // const flashsale = await todaysalemodel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: flashsale,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};

const subscribemailnotificationController = async (req, res, next) => {
  const { email } = req.body;
  const customerEmail = email.toLowerCase();
  try {
    const customerDetails = await CustomerModel.findOne({
      email: customerEmail,
    });
    if (customerDetails) {
      return res.status(200).json({
        status_code: 200,
        status: false,
        message: "you have successfully subscribed to this mail",
      });
    }

    const data = {
      customerEmail,
    };

    let trainee = await CustomermailsubscribtionModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};

const retrievefeaturedshopController = async (req, res, next) => {
  try {
    const featuredseller = await SellerModel.find();
    // const featuredseller = await featuredshopmodel.find()
    // const featuredid = featuredseller.map((x) => x.sellerid)
    // const seller = await SellerModel.find({ _id: { $in: featuredid } })
    //   .limit(10)
    //   .select("photo name");
    // let store = [];

    // //retrieve products for the seller
    // const products = await ProductModel.find({ sellerid: { $in: featuredid } }).select(
    //   "name price sellerid images"
    // );

    // seller.map((item) => {
    //   let sellerproduct = [];

    //   //   map through each product
    //   products.map((prod) => {
    //     const saleid = prod.sellerid.toHexString()
    //     if (saleid == item._id) {
    //       sellerproduct.push(prod);
    //     }
    //   });

    //   //   create an object with the seller details and seller product
    //   const sellerstore = {
    //     storeowner: item,
    //     storeproduct: sellerproduct,
    //   };

    //   //  push to the store variable
    //   store.push(sellerstore);
    // });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "categories successfully retrieved",
      data: featuredseller,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message);
  }
};

module.exports = {
  retrievetopcatgeriesController,
  subscribemailnotificationController,
  retrievefeaturedshopController,
  retrievetodaydealsController,
  userretrieveflashsalesController,
  userretrieveallbrandController,
  userretrievecategoryController,
  retrievealtinsmartproductController,
  retrievealladvertController,
  retrievesingleofferController,
  retrieveallofferController,
};
