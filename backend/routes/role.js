const express = require("express")
const roleRouter = express.Router();
const createRole = require("../controllers/role")
roleRouter.post("/" , createRole)
module.exports = roleRouter