import express from "express"
import {
    getAllProducts,
    CreateProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    getProductBySearch,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts
} from "../controllers/productController.js"

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

router.route("/products")
    .get(getAllProducts)

router.route("/admin/products")
    .get(verifyAdmin,getAdminProducts)

router.route("/admin/product/new").post(verifyAdmin, CreateProduct)

router.route("/admin/product/:id")
    .put(verifyAdmin, updateProduct)
    .delete(verifyAdmin, deleteProduct)

router.route("/product/:id")
    .get(getProductDetails)

router.route("/products/search")
    .get(getProductBySearch)

router.route("/review")
    .put(verifyUser, createProductReview)

router.route("/reviews")
    .get(getProductReviews)
    .delete(verifyUser,deleteReview)


export default router;