const { User } = require('../../../models');

module.exports = async (req, res) => {
  const { oAuthId } = req.user;
  const { nickname, profileImg, introduction } = req.body;
  if (!req.user) {
    res.status(400).json({ updateSuccess: false });
  } else {
    try {
      await User.update(
        {
          nickname: nickname,
          profileImg: profileImg,
          introduction: introduction,
        },
        {
          where: { oAuthId: oAuthId },
        }
      );
      res.json({ updateSuccess: true });
    } catch (err) {
      res.status(500).json({ updateSuccess: false, error: err });
    }
  }
};
