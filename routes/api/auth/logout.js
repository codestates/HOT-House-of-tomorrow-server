module.exports = async (req, res) => {
  let token = req.cookies.x_auth;
  if(token)
    res.clearCookie('x_auth').json({ logoutSuccess: true });
  else
    res.status(500).json({logoutSuccess: false});
};
