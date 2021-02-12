const { User } = require('../../../models');

module.exports = async (req, res) => {
  const { email } = req.user;
  const { nickname, profileImg, introduction } = req.body;
  if (!email) {
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
          where: { email: email },
        }
      );
      res.json({ updateSuccess: true });
    } catch (err) {
      res.status(500).json({ updateSuccess: false, error: err });
    }
  }
};
