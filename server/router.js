'use strict';
const express = require('express');
const User = require('./user');
// const { check, validationResult } = require('express-validator/check');

const router = express.Router();

router.get('/users', (req, res) => {
  const searchTerm = req.query.searchterm.trim().toLowerCase();
  const sortField = req.query.sortfield;
  const sortDirection = req.query.sortdirection;
  const perPage = req.query.perpage;
  const currPage = req.query.currpage;

  User.find((err, users) => {
    if (err) {
      res.status(500).send(err);
    }
    const sortedFilteredUsers = users
      .reverse()
      .filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.sex.toLowerCase() === searchTerm ||
          user.age === +searchTerm
      )
      .sort((user1, user2) => {
        if (sortField === 'age') {
          return (user1[sortField] - user2[sortField]) * sortDirection;
        } else if (
          sortField === 'firstName' ||
          sortField === 'lastName' ||
          sortField === 'sex'
        ) {
          return (
            user1[sortField].localeCompare(user2[sortField], undefined, {
              sensitivity: 'accent',
            }) * sortDirection
          );
        }
      });

    const numPages = Math.ceil(sortedFilteredUsers.length / perPage);
    // currPage starts with 1
    const startIndex = perPage * (currPage - 1);
    const endIndex = perPage * currPage;
    const pagedSortedFilteredUsers = sortedFilteredUsers.slice(
      startIndex,
      endIndex
    );
    console.log('out');
    res.status(200).json({ numPages, pagedSortedFilteredUsers });
  });
});

router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
});

router.post('/users', (req, res) => {
  const user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.sex = req.body.sex;
  user.age = req.body.age;
  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    // res.status(200).json({ message: 'User created.' });
    res.status(200).json(user);
  });
});

router.put('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.save((err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(user);
    });
  });
});

router.delete('/users/:id', (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'User deleted.' });
  });
});

module.exports = router;
