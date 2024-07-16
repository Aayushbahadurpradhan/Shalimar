const productModel = require("../../models/productModel");

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({
                message: "Query parameter 'q' is required",
                error: true,
                success: false
            });
        }

        const regex = new RegExp(query, 'i'); // 'g' flag is not needed for MongoDB queries

        const products = await productModel.find({
            "$or": [
                { productName: regex },
                { category: regex }
            ]
        });

        res.status(200).json({
            data: products,
            message: "Search Product list",
            error: false,
            success: true
        });
    } catch (err) {
        console.error("Error searching products:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = searchProduct;
