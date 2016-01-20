var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Comments() {
  return knex('comments');
}

router.get('/:post_id/comments', function(req, res, next) {
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    res.json({'SUCCESS': posts});
  })
});

router.post('/:post_id/comments', function(req, res, next) {
  Comments().insert({commenter: req.body.commenter, body: req.body.body}).then(function (resp) {
    res.redirect('/');
  })
});

router.get('/:post_id/comments/:comment_id', function(req, res, next) {
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    Comments().where('id', req.params.comment_id).then(function (posts2) {
      res.json({'SUCCESS': posts2});
    })
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
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    Comments().where('id', req.params.comment_id).update({commenter: req.body.commenter}).then(function (posts2) {
      res.send(posts2)
    })
  })
});

router.post('/:post_id/comments/:comment_id/del', function(req, res, next) {
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    Comments().where('id', req.params.comment_id).del().then(function (posts2) {
      res.send(posts2)
    })
  })
});

module.exports = router;
