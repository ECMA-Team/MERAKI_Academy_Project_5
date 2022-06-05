const connection = require("../models/db");

const addToCart = (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.token.userId;
console.log("productId",productId);
console.log("userId",userId);

  const query = `SELECT * FROM cart WHERE user_id=? AND product_id=? AND is_deleted=0`;
  const data = [userId,productId];

  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      console.log("err1",err);
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    if (!result.length) {
      const query = `INSERT INTO cart (product_id,user_id) VALUES (?,?)`;
      const data = [productId, userId];

      console.log("data---------",productId, userId);

      connection.query(query, data, (err, result) => {
        console.log("result",result);
        if (err) {
          console.log("err",err);
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }

        return res.status(200).json({
          success: true,
          massage: "cart created",
          result: result,
        });
      });
    } else {
      
      const newQuantity = result[0].quantity + quantity;
      console.log("err2");
      console.log(newQuantity);
      const query = `UPDATE cart SET quantity=? WHERE user_id=? AND product_id=? `;
      const data = [newQuantity, userId, productId];
      console.log(newQuantity, userId, productId);
      connection.query(query, data, (err, result1) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
  //       const query = `SELECT * FROM cart WHERE user_id=? AND product_id=? `;
  // const data = [productId, userId];
        
  //       connection.query(query,data,(err,result)=>{
  //         if (err) {
  //           return res.status(500).json({
  //             success: false,
  //             massage: "Server error",
  //             err: err,
  //           });
  //         }
          
  //       })
        return res.status(201).json({
          success: true,
          massage: "cart updated",
          result: result1,
        });
      });
    }
  });
};

const emptyCart = (req, res) => {
  const userId = req.token.userId;
  const query = `UPDATE cart SET is_deleted=1 WHERE user_id=?`;

  const data = [userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The Cart with UserId: ${userId} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete cart with UserId: ${userId}`,
      result: result,
    });
  });
};

const deleteFromCart = (req, res) => {
  const userId = req.token.userId;
  const productId = req.params.id;

  const query = `UPDATE cart SET is_deleted=1 WHERE user_id=? AND product_id=? `;

  const data = [userId, productId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
      return res.status(404).json({
        success: false,
        massage: `The product with productId: ${productId} with UserId: ${userId} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete Product with productId: ${productId} from cart with UserId: ${userId}`,
      result: result,
    });
  });
};

const getCartItem = (req, res) => {
  const userId = req.token.userId;

  const query = `SELECT * FROM cart INNER JOIN products ON cart.product_id=products.id WHERE cart.user_id=? AND cart.is_deleted=0`;

  const data = [userId];

  connection.query(query, data, (err, result) => {
    if (err) {
      return  res.status(409).json({
        success: false,
        Message: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      Message: "All Products from cart",
      result: result,
    });
  });
};

module.exports = {
  addToCart,
  emptyCart,
  deleteFromCart,
  getCartItem,
};
