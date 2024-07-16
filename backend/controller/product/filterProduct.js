const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
    try {
        const categoryList = Array.isArray(req.body.category) ? req.body.category : [];

        if (categoryList.length === 0) {
            return res.status(400).json({
                message: "Category list is required",
                error: true,
                success: false
            });
        }

        const products = await productModel.find({
            category: {
                "$in": categoryList
            }
        });

        res.status(200).json({
            data: products,
            message: "Products filtered by category",
            error: false,
            success: true
        });
    } catch (err) {
        console.error("Error filtering products:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = filterProductController;
