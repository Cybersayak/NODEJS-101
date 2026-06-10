const express = require('express');
const router = express.Router();

// All Rotes related to authentication will be defined here

router.post("/login", loginUser);
router.post("/register", registerUser);




module.exports= router;