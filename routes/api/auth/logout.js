module.exports = async (req, res) => {
  if (!req.user) res.status(401).end();
  else {
    res.clearCookie('x_auth');
    res.status(204).end();
  }
};
