const express = require('express');
const router = express.Router();
const validateUserData = require('../validation/users.js');
const userList = [];

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post("/create-one", (req, res) => {
    console.log("create user is running");
    let userData = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        favoriteFoods: req.body.favoriteFoods || [],
        createdAt: Date.now(),
        lastModified: Date.now(),
        getFullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    }

    console.log(userData.getFullName());
    const userDataCheck = validateUserData(userData);

    if (userDataCheck.isValid === false) {
        return res.json({
            success: false,
            errors: userDataCheck.errors
        });
    }

    userList.push(userData);
    console.log("userList", userList);
    return res.json({
        isValid: userDataCheck.isValid,
        success: true
    });
})
module.exports = router;
