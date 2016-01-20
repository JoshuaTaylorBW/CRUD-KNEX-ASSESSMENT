var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Posts() {
  return knex('posts');
}


router.get('/', function(req, res, next) {
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts});
  })
});

router.post('/', function(req, res, next) {
  Posts().insert({author: req.body.author, body: req.body.body}).then(function (resp) {
    res.redirect('/');
  })
});

router.get('/:id', function (req, res, next) {
  Posts().where('id', req.params.id).then(function (resp) {
    res.json({'SUCCESS': resp[0]});
  });
});

router.get('/:id/edit', function (req, res, next) {
  Posts().where('id', req.params.id).then(function (resp) {
    res.json({'SUCCESS': resp[0]});
  });
});

router.get('/:id/edit', function (req, res, next) {
  Posts().where('id', req.params.id).then(function (resp) {
    res.json({'SUCCESS': resp[0]});
  });
});

// knex('books')
//   .where('published_date', '<', 2000)
//   .update({
//     status: 'archived'
//   })

router.post('/:id', function (req, res, next) {
  Posts().where('id', req.params.id).update({'author': req.body.author}).then(function (resp) {
    res.json(resp);
  });
});

router.post('/:id/delete',function (req, res, next) {
  Posts().where('id', req.params.id).del().then(function (resp) {
    Posts().select().then(function (posts) {
      res.json({'SUCCESS': posts});
    })
  });
})

router.post('/:id/delete',function (req, res, next) {
  Posts().where('id', req.params.id).del().then(function (resp) {
    Posts().select().then(function (posts) {
      res.json({'SUCCESS': posts});
    })  
  });
})

module.exports = router;
