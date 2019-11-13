const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./users-model');

const router = express.Router();

router.post('/register', (req, res) => {
    const {username, password, department} = req.body;
    const hash = bcrypt.hashSync(password, 15);

    Users.add({username, password: hash, department})
    .then(addedUser => 
        res.status(200).json(addedUser)
    )
    .catch(err => 
        res.status(500).json({message: err}))
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    Users.findBy({username})
    .then(([user]) => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({message: `Hello ${user.username}! Welcome to your dashboard`, payload: token});
        } else {
            res.status(404).json({message: 'Sorry, we don\'t know who you are'})
        }
    })
    .catch(err => res.status(500).json(err))
})

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
    }
    const options = {
      expiresIn: '1h'
    }
  
    const result = jwt.sign(
      payload,
      'THIS IS THE SECRET',
      options
    )
  
    return result;
}
  
module.exports = router;
  