const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/userAuth");

const { addRetailName, getRetailNames } = require("../controllers/admin");
const {
  createLpo,
  fetchLpoData,
  autocomplete,
} = require("../controllers/retail");

router.post("/retail/retailnames", addRetailName);
router.get("/retail/retailnames", getRetailNames);

router.post("/retail/createlpo", authenticateToken, createLpo);
router.get("/retail/createlpo", authenticateToken, fetchLpoData);

router.get("/retail/autocomplete", autocomplete);

module.exports = router;
