const express = require('express'),
router = express.Router(),
{
    signUp,
    signIn
} = require('../controllers/auth.controller'),
refreshToken = require("../controllers/refreshToken");
verifySignUp = require("../middlewares/verifySignUp");

router.get('/', async (req, res) =>{
    res.send("Hello, Welcome to Prodcut Api");
})

router.post("/register", verifySignUp,  signUp);

router.post("/login", signIn);

router.post("/refreshtoken", refreshToken);
module.exports = router;

