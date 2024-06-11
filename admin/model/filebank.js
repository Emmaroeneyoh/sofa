const { adminimagebankmodel } = require("../core/db/imagebank");




const adminaddfileimageModel = async (data, res) => {
  try {
    const { filebank } = data;

    const filedocs = filebank.map((x) => ({
      url: x.url,
      filename: x.filename,
      filesize: x.filesize,
    }));
    const insertedCategories = await adminimagebankmodel.insertMany(filedocs);
    return insertedCategories;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};
const admindeletefileimageModel = async (data, res) => {
  try {
    const { fileids} = data;

    await adminimagebankmodel.deleteMany({ _id: { $in: fileids } });

    return "success";
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};

module.exports = {
  admindeletefileimageModel,
  adminaddfileimageModel,
 
};
