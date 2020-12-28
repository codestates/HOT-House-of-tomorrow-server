const { verify } = require('jsonwebtoken');
const { Post, User } = require('../../../models');
const config = require('../../../config/index');
const { SECRET } = config;
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  let token = req.cookies.x_auth;

  // if (!token) {
  //   return res.json({ code: 400, message: 'not token' });
  // } else {
    try {
      // verify(token, SECRET);
      let obj ={};
      let acreage = req.query.acreage;
      let housingType = req.query.housingType;
      let space = req.query.space;

      if(acreage && !housingType && !space) {
        obj={acreage};
      } else if(!acreage && housingType && !space) {
        obj={housingType};
      } else if(!acreage && !housingType && space) {
        obj={space};
      } else if(acreage && housingType && !space) {
        obj = {acreage, housingType};
      } else if(acreage && !housingType && space) {
        obj = {acreage, space};
      } else if(!acreage && housingType && space) {
        obj = {housingType, space};
      } else if(acreage && housingType && space) {
        obj = {acreage, housingType, space};
      }

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
          ...obj
        },
      });
      postData = postData.map((el) => el.dataValues);
      res.status(200).json({results : postData});
    } catch (err) {
      res.status(400).json({ postLoad: false });
    }
  // }
};
