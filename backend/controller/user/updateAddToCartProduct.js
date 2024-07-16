const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req?.body?._id;
        const qty = req.body.quantity;

        // Validate that _id and quantity are provided
        if (!addToCartProductId || !qty) {
            return res.status(400).json({
                message: "Product ID (_id) and quantity are required",
                error: true,
                success: false
            });
        }

        // Update the product in the cart
        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId, userId: currentUserId }, { quantity: qty });

        // Check if the product was updated successfully
        if (updateProduct.nModified === 0) {
            return res.status(404).json({
                message: "Product not found in cart or no changes made",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product updated in cart",
            data: updateProduct,
            error: false,
            success: true
        });

    } catch (err) {
        console.error("Error updating product in cart:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
