const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
    try {
        const allProducts = await productModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "All Products",
            success: true,
            error: false,
            data: allProducts
        });
    } catch (err) {
        console.error("Error fetching products:", err); 
        res.status(400).json({
            message: err.message || "Error fetching products",
            error: true,
            success: false
        });
    }
};

module.exports = getProductController;
