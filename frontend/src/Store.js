import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, profileReducer, userReducer } from "./reducers/userReducer"
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer, searchProductReducer } from "./reducers/productReducer"
import { bagReducer } from "./reducers/bagReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";


const appReducer = combineReducers({
   user : userReducer,
   products: productsReducer,
   searchProducts: searchProductReducer,
   profile:profileReducer,
   allUsers:allUsersReducer,
   newProduct:newProductReducer,
   product:productReducer,
   productDetails:productDetailsReducer,
   newReview : newReviewReducer,
   review: reviewReducer,
   bag: bagReducer,
   newOrder:newOrderReducer,
   myOrders:myOrdersReducer,
   orderDetails:orderDetailsReducer,
   allOrders:allOrdersReducer,
   order:orderReducer,
   productReviews:productReviewsReducer
})


const middleware = [thunk]

const store = createStore(
   appReducer,
   composeWithDevTools(applyMiddleware(...middleware))
   )

export default store;