const connection = require("../models/db");
const createRole = (req, res) => {
  const { role } = req.body;
  const query = "INSERT INTO roles (role ) VALUES (?);";
  const data = [role];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: "Server Error",
        err: err,
      });
    }
    res.json({
      success: true,
      massage: "Success role created",
      result: result,
    });
  });

  
};
module.exports = createRole;
