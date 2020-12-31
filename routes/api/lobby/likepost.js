const { verify } = require('jsonwebtoken');
const { Post, User } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  let postId = req.body.postId;

  if (!token) {
    return res.status(400).json({ message: 'not token' });
  } else {
    try {
      let isVerify = verify(token, SECRET);

      await Post.increment({ like: 1 }, { where: { id: postId } });

      let prevLikePostValue = await User.findOne({
        where: { email: isVerify.email },
      }).then((data) => data.dataValues.likePosts);

      
      await User.update(
        {
          likePosts: prevLikePostValue + ',' + postId,
        },
        {
          where: { email: isVerify.email },
        }
      );

      res.status(200).json({ updateSuccess: true });
    } catch (err) {
      res.status(500).json({ updateSuccess: false });
    }
  }
};