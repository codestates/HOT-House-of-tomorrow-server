const { Post, Comment, User } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  let postId = req.params.postId;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      jwt.verify(token, SECRET);

      let postData = await Post.findOne({
        attributes: {
          exclude: ['like', 'view', 'id', 'userId', 'createdAt', 'updatedAt'],
        },
        where: { id: postId },
      }).then((el) => el.dataValues);

      let commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname'],
          },
        ],
        attributes: {
          exclude: ['userId', 'postId', 'id', 'createdAt', 'updatedAt'],
        },
        where: { postId },
      });

      commentInfo = commentData.map((el) => el.dataValues);

      let finalData = {
        ...postData,
        postId: Number(postId),
        comment: commentInfo,
      };

      res.status(200).json({ results: finalData });
    } catch (err) {
      res.status(500).json({ postRead: false });
    }
  }
};