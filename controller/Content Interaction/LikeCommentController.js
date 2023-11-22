const PostCommentLike = require("../../models/Content Interaction/PostCommentLike");
const AnnouncementCommentLike = require("../../models/Content Interaction/AnnouncementCommentLike");

const commentLike_post = async (req, res) => {
  const { postCommentId, announcementCommentId, userId, username } = req.body;

  try {
    let liked;
    if (postCommentId) {
      liked = await PostCommentLike.findOne({
        postCommentId: postCommentId,
        userId: userId,
        username: username,
      });
    } else if (announcementCommentId) {
      liked = await AnnouncementCommentLike.findOne({
        announcementCommentId: announcementCommentId,
        userId: userId,
        username: username,
      });
    } else return res.status(500).json({ message: "Bad Request" });

    if (liked)
      return res.status(302).json({
        message: "Comment already liked",
        liked,
      });

    let like;
    if (postCommentId) {
      like = new AnnouncementLike({
        postCommentId,
        userId,
        username,
      });

      await like.save();
    } else if (announcementCommentId) {
      like = new AnnouncementLike({
        announcementCommentId,
        userId,
        username,
      });

      await like.save();
    }

    return res.status(200).json({
      message: "Comment Liked Successfully",
      like,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const commentLikeCount_get = async (req, res) => {
  const { postCommentId, announcementCommentId } = req.query;

  try {
    let likeCount;
    if (postCommentId)
      likeCount = await PostCommentLike.find({ postCommentId });
    else if (announcementCommentId)
      ikeCount = await AnnouncementCommentLike.find({
        AnnouncementCommentLike,
      });
    else return res.status(500).json({ message: "Bad Request" });

    return res.status(200).json({
      likeCount: likeCount.length,
      likes: likeCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const commentLike_delete = async (req, res) => {
  const { postCommentId, announcementCommentId } = req.query;
  try {
    if (postCommentId) await PostCommentLike.findByIdAndDelete(postCommentId);
    else if (announcementCommentId)
      await AnnouncementCommentLike.findByIdAndDelete(announcementCommentId);

    return res.status(200).json({
      message: "Unliked Comment successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  commentLike_post,
  commentLikeCount_get,
  commentLike_delete,
};
