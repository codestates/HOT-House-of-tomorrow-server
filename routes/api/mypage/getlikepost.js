const { User, Post } = require('../../../models');

module.exports = async (req, res) => {
  let userId = req.query.userId;
  let likes = await User.findOne({
    attributes: ['likePosts'],
    where: { oAuthId: userId },
  });
  let { likePosts } = likes;

  if (likePosts === '0') res.json({ message: 'no like post' });
  else {
    likePosts = likePosts.split(',');
    let results = [];
    for(let postId of likePosts){
      let result = await Post.findOne({
        where: {id: postId}
      });
      results.push(result);
    }

    res.json({ results: results });
  }
};
