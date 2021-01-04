const { User, Post } = require('../../../models');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { SECRET } = config;

module.exports = async (req, res) => {
  const token = req.headers['xauth'];
  const {
    acreage,
    housingType,
    space,
    description,
    roomImage,
    color,
    date,
  } = req.body;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    let tokenData = jwt.verify(token, SECRET);
    let userInfo = await User.findOne({
      where: { email: tokenData.email },
    });
    try {
      await Post.create({
        userId: userInfo.oAuthId,
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

      let postLastId = await Post.findAll().then((data) => 
        data.map((el) => el.dataValues)
      );
      postLastId = postLastId[postLastId.length - 1].id;

      res.status(200).json({ posting: true, postId: postLastId });
    } catch (err) {
      res.status(500).json({ posting: false });
    }
  }
};
