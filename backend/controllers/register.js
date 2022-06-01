const connection = require("../models/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = (req, res) => {
const {firstName,lastName,email,password}=req.body
const role=1
const encryptedPassword = await bcrypt.hash(password, saltRounds);
const data=[firstName,lastName,email,encryptedPassword,role]


const query=`INSERT INTO users (firstName,lastName,email,password,role_id) VALUES (?,?,?,?,?)`;

connection.query(query,data,(err,result)=>{
    if (err) {
        console.log(err);
        return res.status(409).json({
          success: false,
          massage: "The email already exists",
          err:err
        });
      }
      res.status(200).json({
        success: true,
        massage: "Account Created Successfully",
        result
      });
})

};

module.exports = {
  register,
};

