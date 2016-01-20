var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Comments() {
  return knex('comments');
}

router.get('/:post_id/comments', function(req, res, next) {
  console.log('&&&&&&&&&&&&&&&&');
  console.log('&&&&&&&&&&&&&&&&');
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    res.json({'SUCCESS': posts});
  })
});

router.post('/:post_id/comments', function(req, res, next) {
  Comments().insert(req.body).then(function (resp) {
    res.redirect('/posts/'+req.params.post_id+'/comments');
  })
});

router.get('/:post_id/comments/:comment_id', function(req, res, next) {
  Comments().where('id', req.params.comment_id).first().then(function (post) {
    res.json({'SUCCESS': post});
  })
});

router.get('/:post_id/comments/:comment_id/edit', function(req, res, next) {
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    Comments().where('id', req.params.comment_id).then(function (posts2) {
      res.json({'SUCCESS': posts2});
    })
  })
});


router.post('/:post_id/comments/:comment_id', function(req, res, next) {
  Comments().where('id', req.params.comment_id).update({commenter: req.body.commenter}).then(function (posts2) {
    res.redirect('/posts/'+req.params.post_id+'/comments');
  })
});

router.post('/:post_id/comments/:comment_id/delete', function(req, res, next) {
    Comments().where('id', req.params.comment_id).del().then(function (posts2) {
      res.redirect('/posts/'+req.params.post_id+'/comments');
    })
});

module.exports = router;
