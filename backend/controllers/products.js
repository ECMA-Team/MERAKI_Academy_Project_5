const connection =require("../models/db")

const CreateProduct = (req, res) => {
    const { title,description,price, image,  category_id,  sub_category_id } = req.body;

    const query = `INSERT INTO Products (title,description,price, image, category_id,sub_category_id) VALUES (?,?,?,?,?,?);`;
    const data = [title, description, price, image, category_id, sub_category_id];

    connection.query(query, data, (err, result) => {
        console.log(result);
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
            });
        }
        res.status(201).json({
            success: true,
            massage: "Product created",
            result: result,
        });
    });
}


const getAllProduct = (req, res) => {
    const query = `SELECT * FROM Products WHERE is_deleted=0 ;`;
    connection.query(query, (err, result) => {
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

const getProductById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM Products  WHERE id = ?  `;
    const data = [id];

    connection.query(query, data, (err, result) => {
        if (err) {
         return   res.status(500).json({
                success: false,
                massage: "Server Error",
                err: err,
            });
        }
        if (!result.length) {
           return res.status(404).json({
                success: false,
                massage: "The Product is Not Found",
            });
        }
        res.status(200).json({
            success: true,
            massage: `The Product ${id}`,
            result: result,
        });
    });
};

const deleteProductById = (req, res) => {
    const id = req.params.id;

    const query = `UPDATE Products SET is_deleted=1 WHERE id=?;`;

    const data = [id];

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
                massage: `The Product: ${id} is not found`,
                err: err,
            });
        }
        res.status(200).json({
            success: true,
            massage: `Succeeded to delete Product with id: ${id}`,
            result: result,
        });
    });
};


const updateProductById = (req, res) => {
    const { title, description, price, image, category_id, sub_category_id } = req.body;
    const id = req.params.id;

    const query = `SELECT * FROM Products WHERE id=?;`;
    const data = [id];

    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(404).json({
                success: false,
                massage: `Server error`,
                err: err,
            });
        }
        if (!result.length) {
           return res.status(404).json({
                success: false,
                massage: `The Product: ${id} is not found`,
                err: err,
            });
        } // result are the data returned by mysql server
        else {
            const query = `UPDATE Products SET title=?,description=?, price=?,image=?,category_id=?,sub_category_id=? WHERE id=?;`;


            //title, image, price, catgry_id, description, subcatgry_id
            const data = [

                title || result[0].title,
                description || result[0].description,
                price || result[0].price,
                image || result[0].image,
                category_id || result[0].category_id,
                sub_category_id || result[0].sub_category_id,
                id,
            ];

            connection.query(query, data, (err, result) => {
                if (result.affectedRows != 0)
                 res.status(201).json({
                        success: true,
                        massage: `Product updated`,
                        result: result,
                    });
            });
        }
    });
};


module.exports = {
    CreateProduct,
    getAllProduct,
    getProductById,
    deleteProductById,
    updateProductById,
}