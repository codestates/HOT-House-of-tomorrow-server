const { Post, User, Comment } = require('../../../models');

module.exports = async (req, res) => {
    try {
      let postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['oAuthId', 'nickname', 'profileImg', 'introduction'],
          },
        ],
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'acreage',
            'housingType',
            'space',
            'userId',
          ],
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
      res.status(404).json({ postLoad: false });
    }
};
