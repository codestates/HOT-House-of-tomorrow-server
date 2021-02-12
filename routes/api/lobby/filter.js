const { Post, User, Comment } = require('../../../models');

module.exports = async (req, res) => {
  try {
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
      order = 'createdAt';
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
};
