const express = require('express');

const Users = require('../users/users-model');

const router = express.Router();

router.get('/users', (req, res) => {
    if(req.decodedToken && req.decodedToken.department) {
        Users.findBy({department: req.decodedToken.department})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json(err))
    } else {
        res.json({message: "We're sorry you're not cleared to view this information"})
    }
})

module.exports = router;
