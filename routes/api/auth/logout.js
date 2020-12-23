module.exports = async (req, res) => {
  res.clearCookie('x_auth').json({logout : "success"});
};