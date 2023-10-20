
import Product from "../models/productModel.js"
import cloudinary from "cloudinary"

//Create Product
export const CreateProduct = async (req, res, next) => {
    try {
         
        let images = []

        if (typeof req.body.images === 'string') {

            images.push(req.body.images);

        } else {

            images = req.body.images
        }

        const imagesLink = []

        for (let i = 0; i < images.length; i++) {
            try {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });
                imagesLink.push({
                    public_id: result.public_id,
                    url: result.url,
                });
            } catch (uploadError) {
                console.error("Error uploading image:", uploadError);
            }
        }



        req.body.images = imagesLink
        req.body.user = req.user.id

        const products = await Product.create(req.body)

        res.status(201).json({
            success: true,
            products
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Fail To create"
        })
    }

}

export const getAllProducts = async (req, res) => {
    const Products = await Product.find();
    res.status(200).json({
        success: true,
        Products
    })
}

export const getAdminProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json({
            success: true,
            Products
        })
    } catch (err) {
        console.log(err)
    }
}

export const getProductBySearch = async (req, res) => {
    const name = new RegExp(req.query.name, 'i')
    try {
        const Products = await Product.find({ name })
        res.status(200).json({
            success: true,
            NoOfResults: Products.length,
            Products
        })
    } catch (err) {
        res.status(404).json({
            sucess: false,
            message: "Product not found"
        })
    }
}

export const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}

export const updateProduct = async (req, res) => {
    try {

        let products = await Product.findById(req.params.id);


        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        let images = [];


            if (typeof req.body.images === 'string') {

                images.push(req.body.images);
            } else {
                images = req.body.images
            }

        if (images && images.length > 0) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < products.images.length; i++) {
                await cloudinary.v2.uploader.destroy(products.images[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.url,
                });
            }

        req.body.images = imagesLinks;
        }

        products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
        res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Internal Error"
        })

    }

}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
        product.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Product Deleted sucessfully"
        })
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}

export const createProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        const product = await Product.findById(productId);

        const isReviewed = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((rev) => {
                if (rev.user.toString() === req.user._id.toString())
                    (rev.rating = rating), (rev.comment = comment);
            });
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        let avg = 0;

        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });

        product.ratings = avg / product.reviews.length;

        await product.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
        });

    } catch (err) {
        console.log(err)
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
}

export const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id)
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        res.status(200).json({
            success: true,
            Reviews: product.reviews
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Fail to Get"
        })
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const product = await Product.findById(req.query.productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        const userReview = product.reviews.find((rev) => rev._id.toString() === req.query.id.toString())

        if (!userReview) {
            return res.status(404).json({
                success: false,
                message: "Review Not Found"
            });
        }
        if (req.user._id.toString() !== userReview.user.toString()) {
            return res.status(404).json({
                success: false,
                message: "You cant delete"
            });
        }

        const updatedReview = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString())

        let avg = 0

        updatedReview.forEach((rev) => {
            return avg += rev.rating
        })

        let ratings = 0
        if (updatedReview.length === 0) {
            ratings = 0
        } else {
            ratings = avg / updatedReview.length;
        }
        const numOfReviews = updatedReview.length

        const updatedProduct = await Product.findByIdAndUpdate(
            req.query.productId,
            {
                reviews: updatedReview,
                ratings: ratings,
                numOfReviews: numOfReviews
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }

        )

        return res.status(200).json({
            success: true,
            updatedProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};