const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/userAuth");

const { addRetailName, getRetailNames } = require("../controllers/admin");

router.post("/retailnames", addRetailName);
router.get("/retailnames", getRetailNames);

module.exports = router;
