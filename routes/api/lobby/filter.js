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
      const { acreage, housingType, space, color, sort } = req.query;

      let obj = {};
      let arr = [acreage, housingType, space, color];
      let arr2 = ['acreage', 'housingType', 'space', 'color'];
      arr
        .map((el, idx) => {
          if (el === undefined) {
            arr2[idx] = undefined;
          }
          return el;
        })
        .forEach((el, idx) => {
          if (el !== undefined) {
            obj[arr2[idx]] = el;
          }
        });

      let order = 'id';
      let standard = 'ASC';
      if (sort === 'best') {
        order = 'like';
        standard = 'DESC';
      } else {
        orderCol = 'createdAt';
        standard = 'DESC';
      }
      let postData = await Post.findAll({
        include: {
          model: User,
          attributes: ['nickname', 'profileImg', 'introduction'],
        },
        order: [[order, standard]],
        attributes: {
          exclude: ['updatedAt', 'acreage', 'housingType', 'space'],
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
