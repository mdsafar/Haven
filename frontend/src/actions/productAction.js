import axios from "axios";


const Url = "http://localhost:4000"

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_PRODUCT_REQUEST" })

    await axios.get(`${Url}/api/v1/products`).then(({ data }) => {
      dispatch({ type: "ALL_PRODUCT_SUCCESS", payload: data.Products })
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: "ALL_PRODUCT_FAIL", payload: err.response })
  }
}

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "ADMIN_PRODUCT_REQUEST" })

    await axios.get(`${Url}/api/v1/admin/products`, { withCredentials: true }).then(({ data }) => {

      dispatch({ type: "ADMIN_PRODUCT_SUCCESS", payload: data.Products })
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: "ADMIN_PRODUCT_FAIL", payload: err.response.data.message })
  }
}
export const searchProducts = (name) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_PRODUCT_REQUEST" })

    await axios.get(`${Url}/api/v1//products/search?name=${name}`).then(({ data }) => {
      dispatch({ type: "SEARCH_PRODUCT_SUCCESS", payload: data.Products })
    })
  } catch (err) {
    console.log(err)
    dispatch({ type: "SEARCH_PRODUCT_FAIL", payload: err.response.data.message })
  }
}

export const createProduct = (productData) => async (dispatch) => {
  try {
    console.log(productData)
    dispatch({ type: "NEW_PRODUCT_REQUEST" })

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    }
    await axios.post(`${Url}/api/v1/admin/product/new`, productData, config).then((response) => {

      dispatch({ type: "NEW_PRODUCT_SUCCESS", payload: response.data })
    })
  } catch (err) {
    dispatch({ type: "NEW_PRODUCT_FAIL", payload: err.response.data.message })
  }
}

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_PRODUCT_REQUEST" })

    await axios.delete(`${Url}/api/v1/admin/product/${id}`, { withCredentials: true }).then((response) => {

      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: response.data.success })
    })

  } catch (err) {
    dispatch({ type: "DELETE_PRODUCT_FAIL", payload: err.response.data.message })
  }
}

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" })

    await axios.get(`${Url}/api/v1/product/${id}`).then((response) => {

      dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: response.data.product })
    })
  } catch (err) {
    dispatch({ type: "PRODUCT_DETAILS_FAIL", payload: err.response.data.message })
  }
}

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

    const config = {
      headers: { "Content-Type": "application/json" }, withCredentials: true,
    };

    await axios.put(`${Url}/api/v1/admin/product/${id}`, productData, config).then((response) => {
      dispatch({
        type: "UPDATE_PRODUCT_SUCCESS",
        payload: response.data.success,
      });
    })


  } catch (error) {
    dispatch({
      type: "UPDATE_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" })
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };
    await axios.put(`${Url}/api/v1/review`, reviewData, config).then((response) => {
      dispatch({ type: "NEW_REVIEW_SUCCESS", payload: response.data.success })
    })
  } catch (err) {
    dispatch({ type: "NEW_REVIEW_FAIL", payload: err.response.data.message })
  }
}
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REVIEW_REQUEST" })

    await axios.delete(`${Url}/api/v1/reviews?id=${reviewId}&productId=${productId}`, { withCredentials: true }).then((response) => {
      dispatch({ type: "DELETE_REVIEW_SUCCESS", payload: response.data.success })
    })
  } catch (err) {
    dispatch({ type: "DELETE_REVIEW_FAIL", payload: err.response.data.message })
  }
}

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    await axios.get(`${Url}/api/v1/reviews?id=${id}`).then((response) => {
      console.log(response)
      dispatch({
        type: "ALL_REVIEW_SUCCESS",
        payload: response.data.Reviews,
      });
    })

  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};