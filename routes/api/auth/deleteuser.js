const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json("deleteuser");
});

module.exports = router;