const { verify } = require('jsonwebtoken');
const { Post, User, Comment } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    return res.json({ code: 400, message: 'not token' });
  } else {
    try {
      verify(token, SECRET);
      let obj = {};
      let acreage = req.query.acreage;
      let housingType = req.query.housingType;
      let space = req.query.space;
      let color = req.query.color;

      if (acreage && !housingType && !space && !color) {
        obj = { acreage };
      } else if (!acreage && housingType && !space && !color) {
        obj = { housingType };
      } else if (!acreage && !housingType && space && !color) {
        obj = { space };
      } else if (!acreage && !housingType && !space && color) {
        obj = { color };
      } else if (acreage && housingType && !space && !color) {
        obj = { acreage, housingType };
      } else if (acreage && !housingType && space && !color) {
        obj = { acreage, space };
      } else if (acreage && !housingType && !space && color) {
        obj = { acreage, color };
      } else if (!acreage && housingType && space && !color) {
        obj = { housingType, space };
      } else if (!acreage && housingType && !space && color) {
        obj = { housingType, color };
      } else if (!acreage && !housingType && space && color) {
        obj = { space, color };
      } else if (acreage && housingType && space && !color) {
        obj = { acreage, housingType, space };
      } else if (acreage && housingType && !space && color) {
        obj = { acreage, housingType, color };
      } else if (!acreage && housingType && space && color) {
        obj = { housingType, space, color };
      } else if (acreage && housingType && space && color) {
        obj = { acreage, housingType, space, color };
      }

      let postData = await Post.findAll({
        include: {
          model: User,
          attributes: ['nickname', 'profileImg', 'introduction'],
        },
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'acreage',
            'housingType',
            'space',
          ],
        },
        where: {
          ...obj,
        },
      });
      let commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ['nickname', 'profileImg'],
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'id', 'userId', 'date'],
        },
      });

      postData = postData.map((el) => {
        let data = el.dataValues;
        let getComment = commentData
          .filter((el2) => el2.dataValues.postId === data.id)
          .map((el3) => el3.dataValues);

        data['comments'] = getComment;
        return data;
      });

      res.status(200).json({ results: postData });
    } catch (err) {
      res.status(400).json({ postLoad: false });
    }
  }
};
