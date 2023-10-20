
import axios from "axios";
const Url = "http://localhost:4000"

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      }, withCredentials: true,
    };
    await axios.post(`${Url}/api/v1/order/new`, order, config).then((response) => {
      dispatch({ type: "CREATE_ORDER_SUCCESS", payload: response.data.newOrder });
    })

  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "MY_ORDERS_REQUEST" });

    await axios.get(`${Url}/api/v1/orders/me`, { withCredentials: true }).then((response) => {
      dispatch({ type: "MY_ORDERS_SUCCESS", payload: response.data.order });
    })
  } catch (error) {
    dispatch({
      type: "MY_ORDERS_FAIL",
      payload: error.response.data.message,
    });
  }
};
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });

    await axios.get(`${Url}/api/v1/order/${id}`, { withCredentials: true }).then((response) => {

      dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: response.data.order });
    })
  } catch (error) {
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ORDERS_REQUEST" });

    await axios.get(`${Url}/api/v1/admin/orders`, { withCredentials: true }).then((response) => {
      dispatch({ type: "ALL_ORDERS_SUCCESS", payload: response.data.orders });
    })
  } catch (err) {
    dispatch({
      type: "ALL_ORDERS_FAIL",
      payload: err.response.data.message,
    });
  }
}
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials:true
    };
    await axios.put(`${Url}/api/v1/admin/order/${id}`,order, config).then((response)=>{
       dispatch({ type: "UPDATE_ORDER_SUCCESS", payload:response.data.success });
    })
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ORDER_REQUEST" });

    await axios.delete(`${Url}/api/v1/admin/order/${id}`,{withCredentials:true}).then((response)=>{
      dispatch({ type: "DELETE_ORDER_SUCCESS", payload: response.data.success });
    })
  
  } catch (error) {
    dispatch({
      type: "DELETE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};