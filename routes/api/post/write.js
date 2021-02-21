const { Post } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;

  const {
    acreage,
    housingType,
    space,
    description,
    roomImage,
    color,
    date,
  } = req.body;

  try {
    let newPost = await Post.create({
      userId: oAuthId,
      acreage: acreage,
      housingType: housingType,
      space: space,
      description: description,
      roomImage: roomImage,
      color: color,
      like: 0,
      view: 0,
      date: date,
    });

    res.status(200).json({ posting: true, postId: newPost.id });
  } catch (err) {
    res.status(500).json({ posting: false });
  }
};
