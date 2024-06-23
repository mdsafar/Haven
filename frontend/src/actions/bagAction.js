import axios from "axios";

const Url = "http://localhost:4000"

export const addItemsToBag = (user, product, quantity) => async (dispatch) => {
  try {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      }, withCredentials: true,
    };
    await axios.post(`${Url}/api/v1/add-to-bag`, { user, product, quantity }, config)
  } catch (err) {
    console.log(err)
  }

};

export const getBagItem = (id) => async (dispatch) => {
  try {
    await axios.get(`${Url}/api/v1/bag/${id}`, { withCredentials: true }).then((response) => {
      const item = response.data.bagItems
      const items = item.map((item) => {
        return {
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.images[0].url,
          stock: item.product.Stock,
          category: item.product.category,
          quantity: item.quantity,
        };
      });

      dispatch({
        type: "GET_BAG_ITEM",
        payload: items,
      });
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateQuantity = (itemId, quantity) => async (dispatch) => {
  try {
    await axios.put(`${Url}/api/v1/update-bag-item`, { itemId, quantity }, { withCredentials: true }).then((response) => {
      dispatch({ type: "UPDATE_BAG_ITEM", payload: response.data.success })
    })

  } catch (err) {
    console.log(err)
  }
}

export const removeItemsFromBag = (itemId) => async () => {
  try {
    await axios.delete(`${Url}/api/v1/bag/${itemId}`, { withCredentials: true });
  } catch (err) {
    console.error(err);
  }
};

export const saveShippingInfo = (data) => (dispatch) => {
  dispatch({
    type: "SAVE_SHIPPING_INFO",
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};