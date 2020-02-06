const axios = require('axios');
const express = require('express');
const router = require('express').Router();
// const db = require('../models/strain_model.js');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secret.js');

// const axioswithHeader = (strain) => (axios.create({
//   body: { strain: strain }
// }))

router.get('/:strain', (req, res) => {
  const strain = req.params.strain;
  console.log(req.body)
  const requestOptions = {
    headers: { accept: 'application/json' },
    data:{ strain: strain}
  };


  axios
    .get('https://med-cabinet-1.herokuapp.com/strain', requestOptions)
      
    .then(response => {
      console.log(response)
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error getting strain data', error: err });
      console.log(err)
    });
});





module.exports = router;