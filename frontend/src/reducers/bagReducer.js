
const initialState = {
  bagItems: [],
  shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
};

export const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BAG_ITEM":
      return {
        ...state,
        bagItems: action.payload,
      };
    case "UPDATE_BAG_ITEM":
      return {
        ...state,
        isUpdated: action.payload
      }

    case "SAVE_SHIPPING_INFO":
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
}
