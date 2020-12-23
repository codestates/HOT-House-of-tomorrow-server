const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json("filter posts");
});

module.exports = router;