const { CustomerModel } = require("../../customer/core/db/customer");
const { customerordermodel } = require("../../customer/core/db/order");
const { ProductModel } = require("../../seller/core/db/product");
const { SellerModel } = require("../../seller/core/db/seller");
const { BrandModel } = require("../core/db/brand");
const { CategoryModel } = require("../core/db/category");
const { handleError } = require("../core/utils");

const admindashboardController = async (req, res, next) => {
  try {
    //customers
    const customer = await CustomerModel.countDocuments();
    //product
    const product = await ProductModel.countDocuments();
    //order
    const order = await customerordermodel.countDocuments();
    const topbrand = await BrandModel.find()
      .limit(10)
      .sort({ amount_purchased: 1 });
    const topcategory = await CategoryModel.find()
      .limit(10)
      .sort({ amount_purchased: 1 });
    //total sales
      const total = await customerordermodel.find({ order_status: "pending" }).select('subprice')
    const totalsales = total.reduce((sum, item) => sum + item.subprice, 0);
    const monthlysaled = await customerordermodel.find();
    //pending order
    const pendingorder = await customerordermodel.countDocuments({
      order_status: "pending",
    });
    //approved order
    const confirmorder = await customerordermodel.countDocuments({
      order_status: "approved",
    });
    //approved order
    const processedorder = await customerordermodel.countDocuments({
      order_status: "shipping",
    });
    //approved order
    const deliveredorder = await customerordermodel.countDocuments({
      order_status: "delivered",
    });
    //approved order
    const totalbrand = await SellerModel.countDocuments();
    const totalcategory = await CategoryModel.countDocuments();
    const categorysales = await CategoryModel.find();
    const topproducts = await ProductModel.find().limit(6).select('name images price rating')
   

    //barhcart
    //barchart 
    const monthlyTotals = [];
    for (let month = 1; month <= 12; month++) {
      const startOfMonth = new Date(2024, month - 1, 1); // Month is zero-based in JavaScript Date object
      const endOfMonth = new Date(2024, month, 0, 23, 59, 59); // Last day of the month
      const totalOrders = await customerordermodel.countDocuments({ 
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      });
      monthlyTotals.push({ [month]: totalOrders });
    }
    const dashboard = {
      customer,
      product,
      order,
      topbrand,
      topcategory,
      totalsales,
    //   monthlysaled,
      pendingorder,
      confirmorder,
      processedorder,
      deliveredorder,
      totalbrand,  totalcategory ,categorysales , topproducts , monthlyTotals
    };
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: dashboard
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
    admindashboardController
}