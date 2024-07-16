const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;

        // Validate that _id is provided
        if (!addToCartProductId) {
            return res.status(400).json({
                message: "Product ID (_id) is required",
                error: true,
                success: false
            });
        }

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId });

        if (!deleteProduct.deletedCount) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product deleted from cart",
            error: false,
            success: true,
            data: deleteProduct
        });

    } catch (err) {
        console.error("Error deleting product from cart:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = deleteAddToCartProduct;
