const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const Entry = require('../model/entry');
var isEdit = new Boolean(false); 


router.get('/', async function(req,res){
  var entries = await Entry.find();
  res.render('index', {entries});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});

router.post('/newPost', async (req,res) =>{
  var entry = new Entry(req.body);
  await entry.save();
  /* // forma manual:
  var entry2 = new Entry({
    title: req.body.title,
    author: req.body.author,
    post_data: req.body.post_data
  })
  */
  res.redirect('/');
  res.end();
});

router.get('/editPost/:id', async (req,res) =>{
  var id = req.params.id;
  var entry = await Entry.findById(id);
  isEdit = true;
  res.render('edit', {entry, isEdit});
});

router.post('/editPost/:id', async (req,res) =>{
  await Entry.updateOne({_id: req.params.id}, {$set: {
    title: req.body.title,
    author: req.body.author,
    post_data: req.body.post_data
  }});
  res.redirect('/');
  res.end();
});

router.get('/deletePost/:id', async (req,res) =>{
  var id = req.params.id;
  var entry = await Entry.findById(id);
  isEdit = false;
  console.log(isEdit);
  res.render('edit', {entry, isEdit});
});

router.post('/deletePost/:id', async (req,res) =>{
  var id = req.params.id;
  await Entry.deleteOne({_id: id});
  res.redirect("/");
  res.end();
});



module.exports = router;