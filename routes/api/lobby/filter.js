const { verify } = require('jsonwebtoken');
const { Post, User } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  if (!token) {
    return res.json({ code: 400, message: 'not token' });
  } else {
    try {
      verify(token, SECRET);
      let postData = await Post.findAll({
        include: {
          model: User,
          attributes: ['nickname', 'profileImg'],
        },
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'acreage',
            'housingType',
            'space',
            'description',
          ],
        },
        where: {
          acreage: req.query.acreage,
          housingType: req.query.housingType,
          space: req.query.space,
        },
      });
      postData = postData.map((el) => el.dataValues);
      res.status(200).json({results : postData});
    } catch (err) {
      res.status(400).json({ postLoad: false });
    }
  }
};
