const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const depRoutes = require("./department");
const retailRoutes = require("./retail");
const designationRoutes = require("./designation");
const accountRoutes = require("./accounts");

router.use("/auth", userRoutes);
router.use("/auth", depRoutes);
router.use("/auth", retailRoutes);
router.use("/auth", designationRoutes);
router.use("/auth", accountRoutes);

module.exports = router;
