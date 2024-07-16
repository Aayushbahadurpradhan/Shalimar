const uploadProductPermission = require('../../helpers/permission');
const productModel = require('../../models/productModel');

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            return res.status(403).json({
                message: "Permission denied",
                error: true,
                success: false
            });
        }

        const { _id, ...resBody } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        if (!updateProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });

    } catch (err) {
        console.error("Error updating product:", err); // Log the error for debugging purposes
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = updateProductController;
