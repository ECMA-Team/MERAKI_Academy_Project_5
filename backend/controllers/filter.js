const connection = require("../models/db");
const getBrandCat = (req, res) => {
  const brand = req.params.brand;
  const query = `SELECT * FROM category INNER JOIN brands ON category.brand_id=brands.id WHERE category.is_deleted=0 AND brands.brand=? ;`;

  const data = [brand];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the Product",
      result: result,
    });
  });
};

const getProCategory = (req, res) => {
  const { category, sub_category, brand } = req.body;

  const query = `SELECT * FROM Products INNER JOIN category ON products.category_id=category.id INNER JOIN sub_category ON products.sub_category_id=sub_category.id INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0 AND category.category=? AND sub_category.sub_category=? AND brands.brand=? ;`;

  const data = [category, sub_category, brand];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the Product",
      result: result,
    });
  });
};

const getProCB = (req, res) => {
  const { category, brand } = req.body;

  const query = `SELECT * FROM Products INNER JOIN category ON products.category_id=category.id  INNER JOIN brands ON products.brand_id=brands.id WHERE products.is_deleted=0 AND category.category=? AND brands.brand=? ;`;

  const data = [category, brand];
  connection.query(query, data, (err, result) => {
    if (err) {
      return  res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the Product",
      result: result,
    });
  });
};

const subCByCat = (req, res) => {
  const { category } = req.params;

  const query = `SELECT * FROM sub_category INNER JOIN category ON sub_category.category_id=category.id WHERE sub_category.is_deleted=0 AND category.category=? ;`;
  const data = [category];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "All the SUB-CATEGORY",
      result: result,
    });
  });
};

module.exports = {
  getBrandCat,
  getProCategory,
  subCByCat,
  getProCB,
};
