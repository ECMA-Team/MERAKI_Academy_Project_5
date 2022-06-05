const connection = require("../models/db")

const addBrand = (req, res) => {

    const { brand, image } = req.body;
    const query = `INSERT INTO brands (brand,image) VALUES (?,?);`;
    const data = [brand, image];
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "server error",
                err: err,
            });
        }
        res.status(201).json({
            success: true,
            massage: "brand created",
            result: result,
        });
    });
};


const getAllBrand = (req, res) => {
    const query = `SELECT * FROM brands WHERE is_deleted=0 ;`;
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
            massage: "All the brand",
            result: result,
        });
    });
};

const getBrandById = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM brands WHERE id = ? `;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) {
            return  res.status(500).json({
                success: false,
                massage: "Server Error",
                err: err,
            });
        }
        if (!result.length) {
            return res.status(404).json({
                success: false,
                massage: "The brand is Not found",

            });
        }
        res.status(200).json({
            success: true,
            massage: `the brand ${id}`,
            result: result,
        });
    });
};

const deleteBrandById = (req, res) => {
    const id = req.params.id;
    const query = `UPDATE brands SET is_deleted=1 WHERE id=?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                massage: "Server error",
                err: err,
            });
        }
        if (!result.changedRows) {
            return res.status(404).json({
                success: false,
                massage: `The brand ${id} is not found`,
                err: err,
            });
        }
        res.status(200).json({
            success: true,
            massage: `Succeeded to delete product with id : ${id}`,
            result: result,
        });
    });
};

const updateBrandById = (req, res) => {
    const { brand, image } = req.body;
    const id = req.params.id;
    const query = `SELECT * FROM brands WHERE id=?;`;
    const data = [id];
    connection.query(query, data, (err, result) => {
        // console.log(result+"oneeeee");
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
                massage: `The brand: ${id} is not found`,
                err: err,
            });
        }
        else {
            const query = `UPDATE brands SET brand=?,image=? WHERE id=?;`;

            const data = [
                brand || result[0].brand ,
                image || result[0].image ,
                id,
            ];

            connection.query(query, data, (err, result) => {
                console.log(result);
                // console.log("lkllllllllllll"+result);
                if (result.affectedRows != 0)
                    res.status(201).json({
                        success: true,
                        massage: `brand updated`,
                        result: result,
                    });
            });
        }
    });
};





module.exports = {
    addBrand,
    getAllBrand,
    getBrandById,
    deleteBrandById,
    updateBrandById
}
