const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Entry = require('../model/entry');


router.get('/', async function(req,res){
  var entries = await Entry.find();
  var entrySize = entries.length;
  res.render('index', {Entry, entrySize});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.get('/editPost', async (req,res) =>{
  res.render('edit');
});

router.get('/deletePost', async (req,res) =>{
  res.render('edit');
});



module.exports = router;