const { sellerBlogmodel } = require("../../seller/core/db/blog");
const { commentModel } = require("../core/db/comment");
const { replyModel } = require("../core/db/reply");

const customerretrieveblogModel = async (data, res) => {
  try {
    const { customerid } = data;
    const blogs = await sellerBlogmodel
      .find().sort({createdAt:-1})
      .populate({ path: "sellerid", select: "name logo" });
    const bloginfo = blogs.map((blog) => {
      let likedByCurrentUser = false;
      if (
        customerid &&
        blog.likes.some((like) => like._id.equals(customerid))
      ) {
        likedByCurrentUser = true;
      }

      return {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        sellerid: blog.sellerid,
        productad: blog.productad,
        totalcomment: blog.totalcomment,
        externalapi: blog.externalapi,
        createdAt: blog.createdAt,
        media: blog.media,
        likes: blog.likes.length,
        likedByCurrentUser: likedByCurrentUser,
      };
    });
    const populatedBlogs = await sellerBlogmodel.populate(bloginfo, {
      path: "seller",
      select: "name logo",
    });
    return populatedBlogs;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerretrievesellerblogModel = async (data, res) => {
  try {
    const { customerid, sellerid } = data;
    const blogs = await sellerBlogmodel
      .find({ sellerid }).sort({createdAt:-1})
      .populate({ path: "sellerid", select: "name logo" });
    const bloginfo = blogs.map((blog) => {
      let likedByCurrentUser = false;
      if (
        customerid &&
        blog.likes.some((like) => like._id.equals(customerid))
      ) {
        likedByCurrentUser = true;
      }

      return {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        sellerid: blog.sellerid,
        productad: blog.productad,
        totalcomment: blog.totalcomment,
        createdAt: blog.createdAt,
        media: blog.media,
        externalapi: blog.externalapi,
        likes: blog.likes.length,
        likedByCurrentUser: likedByCurrentUser,
      };
    });
    const populatedBlogs = await sellerBlogmodel.populate(bloginfo, {
      path: "seller",
      select: "name logo",
    });
    return populatedBlogs;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerretrievesingleblogModel = async (data, res) => {
  try {
    const { blogid, customerid } = data;

    const blog = await sellerBlogmodel
      .findById(blogid)
      .populate({ path: "sellerid", select: " name logo" });
    const comment = await commentModel.find({ blogid });
    const commentinfo = comment.map((blog) => {
      let likedByCurrentUser = false;
      if (
        customerid &&
        blog.likes.some((like) => like._id.equals(customerid))
      ) {
        likedByCurrentUser = true;
      }
      return {
        _id: blog._id,
        comment: blog.comment,
        customerid: blog.customerid,
        likes: blog.likes.length,
        totalreply: blog.replies.length,
        replies: blog.replies,
        createdAt: blog.createdAt,
        likedByCurrentUser: likedByCurrentUser,
      };
    });
    const comments = await commentModel.populate(commentinfo, [
      {
        path: "customerid",
        select: "name photo",
      },
      {
        path: "replies",
        populate: {
          path: "customerid",
          select: "name photo",
        },
      },
    ]);
    const blogdata = { blog, comments };
    return blogdata;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerreactblogModel = async (data, res) => {
  try {
    const { customerid, blogid } = data;
    const comment = await sellerBlogmodel.findById(blogid);

    const alreadyLiked = comment.likes.includes(customerid);

    if (alreadyLiked) {
      // User has already liked the comment, so unlike it
      comment.likes.pull(customerid);
    } else {
      // User hasn't liked the comment yet, so like it
      comment.likes.push(customerid);
    }
    await comment.save();

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerretrievesinglecommentModel = async (data, res) => {
  try {
    const { commentid, customerid } = data;

    const reply = await replyModel.find({ commentid });
    const replyinfo = reply.map((blog) => {
      let likedByCurrentUser = false;
      if (
        customerid &&
        blog.likes.some((like) => like._id.equals(customerid))
      ) {
        likedByCurrentUser = true;
      }
      return {
        _id: blog._id,
        reply: blog.reply,
        createdAt: blog.createdAt,
        customerid: blog.customerid,
        likes: blog.likes.length,
        likedByCurrentUser: likedByCurrentUser,
      };
    });
    const populatedreply = await replyModel.populate(replyinfo, {
      path: "customerid",
      select: "name photo",
    });
    const comment = await commentModel.findById(commentid);
    const blogdata = { populatedreply, comment };
    return blogdata;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customeraddcommentModel = async (data, res) => {
  try {
    const { comment, customerid, blogid } = data;

    const form = await new commentModel({
      comment,
      customerid,
      blogid,
    });

    const useraddress = await form.save();
    //update the blog comment
    await sellerBlogmodel.findByIdAndUpdate(blogid, {
      $inc: {
        totalcomment: 1,
      },
    });
    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerreactcommentModel = async (data, res) => {
  try {
    const { commentid, customerid } = data;
    const comment = await commentModel.findById(commentid);

    const alreadyLiked = comment.likes.includes(customerid);

    if (alreadyLiked) {
      // User has already liked the comment, so unlike it
      comment.likes.pull(customerid);
    } else {
      // User hasn't liked the comment yet, so like it
      comment.likes.push(customerid);
    }
    await comment.save();

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerdeletecommentModel = async (data, res) => {
  try {
    const { blogid, commentid } = data;

    //delete comment
    await commentModel.findByIdAndDelete(commentid);

    //delete replies
    await replyModel.deleteMany({ commentid });
    //update the blog comment
    await sellerBlogmodel.findByIdAndUpdate(blogid, {
      $inc: {
        totalcomment: -1,
      },
    });
    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customeraddreplyModel = async (data, res) => {
  try {
    const { reply, commentid, customerid, blogid } = data;

    const form = await new replyModel({
      reply,
      customerid,
      blogid,
      commentid,
    });

    const useraddress = await form.save();
    const replyid = useraddress._id;
    //update the blog comment
    await commentModel.findByIdAndUpdate(commentid, {
      $inc: {
        totalcomment: 1,
      },
      $push: {
        replies: replyid,
      },
    });
    //update the blog comment
    await sellerBlogmodel.findByIdAndUpdate(blogid, {
      $inc: {
        totalcomment: 1,
      },
    });
    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerreactreplyModel = async (data, res) => {
  try {
    const { replyid, customerid } = data;
    const comment = await replyModel.findById(replyid);

    const alreadyLiked = comment.likes.includes(customerid);

    if (alreadyLiked) {
      // User has already liked the comment, so unlike it
      comment.likes.pull(customerid);
    } else {
      // User hasn't liked the comment yet, so like it
      comment.likes.push(customerid);
    }
    await comment.save();

    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerdeletereplyModel = async (data, res) => {
  try {
    const { blogid, replyid, commentid } = data;

    //delete replies
    await replyModel.findByIdAndDelete(replyid);
    //update the blog comment
    await commentModel.findByIdAndUpdate(commentid, {
      $inc: {
        totalcomment: -1,
      },
      $pull: {
        replies: replyid,
      },
    });
    //update the blog comment
    await sellerBlogmodel.findByIdAndUpdate(blogid, {
      $inc: {
        totalcomment: -1,
      },
    });
    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
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
};
