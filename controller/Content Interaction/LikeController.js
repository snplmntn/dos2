const Like = require("../../models/Content Interaction/Like");

const likePost = async (req, res) => {
  const { postId, userId } = req.body;

  const liked = await Like.findOne({
    postId: postId,
    userId: userId,
  });

  if (liked)
    return res.status(200).json({
      message: "Post already liked",
      liked,
    });

  const like = new Like({
    postId,
    userId,
  });
  try {
    await like.save();

    return res.status(200).json({
      message: "Post Liked Successfully",
      like,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const getPostLikeCount = async (req, res) => {
  const { postId } = req.params;
  try {
    const likeCount = await Like.countDocuments({ postId });

    return res.status(200).json({
      likeCount,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const unlikePost = async (req, res) => {
  const { likeId } = req.params;
  try {
    await Like.findByIdAndDelete(likeId);

    return res.status(200).json({
      message: "Unliked Post successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  likePost,
  getPostLikeCount,
  unlikePost,
};
