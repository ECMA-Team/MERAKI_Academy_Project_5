const connection = require("../models/db");

const Createsub_category = (req, res) => {
  const { sub_category, category_id } = req.body;

  const query = `INSERT INTO sub_category (sub_category,category_id) VALUES (?,?);`;
  const data = [sub_category, category_id];

  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      return  res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "sub_category created",
      result: result,
    });
  });
};

module.exports = { Createsub_category};
