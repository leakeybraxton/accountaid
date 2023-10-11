const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/userAuth");

const { addDepartment, getAllDepartments } = require("../controllers/admin");

router.post("/departments", authenticateToken, addDepartment);
router.get("/departments", getAllDepartments);

module.exports = router;
