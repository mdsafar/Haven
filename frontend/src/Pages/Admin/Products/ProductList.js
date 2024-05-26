import React, { useEffect } from "react";
import "./ProductList.css";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, getAdminProducts } from "../../../actions/productAction";
import Loader from "../../../Components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert"




const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert()

  const { products, loading,error } = useSelector((state) => state.products)
  const { isDeleted,error:deleteError } = useSelector((state) => state.product)


  function handleDelete(id) {
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({type:"CLEAR_ERRORS"});
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch({type:"CLEAR_ERRORS"});
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully")
      navigate("/admin/products")
      dispatch({ type: "DELETE_PRODUCT_RESET" })
    }
    dispatch(getAdminProducts())
  }, [dispatch, alert,deleteError,error, isDeleted,navigate])

  return <>
    {loading ? (
      <Loader />
    ) : (
      <div className="dashboard">
        <Sidebar />
        <div className="list_items">
          <div className=" top_item d-flex justify-content-between">
            <h1>Product List</h1>
            <button><Link to="/dashboard/product">Create Product</Link> </button>
          </div>
          <ul className="product_list">
            {products.map((product, index) => (
              <li key={index} className="product">
                <div className="product_img">
                  {product.images && product.images.length > 0 && (
                    <img src={product.images[0].url} alt="" />
                  )}
                </div>
                <div className="product_detail">
                  <h3>{product.name}</h3>
                  <p>Product Id: {product._id}</p>
                  <p>Price: ₹ {product.price}.00</p>
                  <p>Category: {product.category}</p>
                </div>
                <Link  className="edit_btn" to={`/dashboard/product/${product._id}`}><button  className="edit_btn"><i class="bi bi-pencil"></i>Edit</button></Link>
                <button onClick={() => handleDelete(product._id)} className="delete_btn"><i class="bi bi-trash3"></i> Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
    }
  </>
};

export default ProductList;