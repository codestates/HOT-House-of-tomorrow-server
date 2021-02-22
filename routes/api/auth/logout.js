module.exports = async (req, res) => {
  console.log(req.user);
  if (!req.user) {
    res.status(401).json({ isLogout: false });
  } else {
    res.clearCookie('x_auth');
    res.status(204).json({ isLogout: true });
  }
};
