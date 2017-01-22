'use strict';

const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
  const url = 'http://yify.is/api/v2/list_movies.json?limit=30';
  let r = null;
  r = request(url);

  req.pipe(r).pipe(res);
});

module.exports = router;
