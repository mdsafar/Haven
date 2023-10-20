import React, { useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";


const NewProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const alert = useAlert()

  const { loading,success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const productFor = [
    "men",
    "women",
    "kids",
  ];

  useEffect(() => {
    if (success) {
        alert.success("Product Created Successfully")
      navigate("/admin/products")
      dispatch({ type: "NEW_PRODUCT_RESET" });
    }
  }, [success,dispatch,alert,navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const formDataObject = {
      name: name,
      price: price,
      description: description,
      category: category,
      Stock: Stock,
      for: productType,
      images: images, 
    };

    dispatch(createProduct(formDataObject))
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    setImages([])
    setImagesPreview([])

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
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
                <option value="">Product For</option>
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
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
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
              Create
            </button>
          </form>
        </div>
  );
};

export default NewProduct;