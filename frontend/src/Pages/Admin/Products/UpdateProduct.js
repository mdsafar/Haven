import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetails, updateProduct } from "../../../actions/productAction";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert();
  const {id} = useParams()
  const { error, product } = useSelector((state) => state.productDetails);

  const { loading, error: updateError,isUpdated, } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [productType,setProductType] = useState('')
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);

  const productFor = [
   "men",
   "women",
   "kids"
  ];

  const productId = id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setProductType(product.for)
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch({type:"CLEAR_ERRORS"});
    }

    if (updateError) {
      alert.error(updateError);
      dispatch({type:"CLEAR_ERRORS"});
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate('/admin/products')
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const formDataObject = {
      name: name,
      price: price,
      description: description,
      category: category,
      Stock: Stock,
      for: productType,
    };
    
    if (images.length > 0) {
      formDataObject.images = images;
    }

    dispatch(updateProduct(productId, formDataObject));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([])

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <select onChange={(e) => setProductType(e.target.value)}>
                <option value={productType} >Product For</option>
                {productFor.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
  );
};

export default UpdateProduct;