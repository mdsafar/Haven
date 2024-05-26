import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Featured from "./Pages/Featured/Featured"
import Men from "./Pages/Men/Men"
import Women from "./Pages/Women/Women"
import Kid from "./Pages/Kid/Kid"
import Bag from "./Pages/Bag/Bag"
import Contact from "./Pages/Contact/Contact"
import About from "./Pages/About/About"
import ProductDetails from "./Pages/Products/ProductDetails"
import SearchProductList from "./Pages/Products/SearchProductList"
import NotFound from "./Components/NotFound/NotFound"
import LoginSignUp from "./Pages/User/LoginSignUp.js"
import Profile from "./Pages/User/Profile"
import ProtectedRoute from "./Route/ProtectedRoute";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import ProductList from "./Pages/Admin/Products/ProductList";
import UpdateProfile from "./Pages/User/UpdateProfile";
import UserList from "./Pages/Admin/Users/UserList"
import NewProduct from "./Pages/Admin/Products/NewProduct";
import Shipping from "./Pages/Bag/Shipping";
import ConfirmOrder from "./Pages/Bag/ConfirmOrder";
import MyOrders from "./Pages/Order/MyOrder";
import OrderDetails from "./Pages/Order/OrderDetails";
import OrderList from "./Pages/Admin/Orders/OrderList";
import ProcessOrder from "./Pages/Admin/Orders/ProcessOrder";
import OrderSuccess from "./Pages/Bag/OrderSuccess";
import UpdateProduct from "./Pages/Admin/Products/UpdateProduct";
import ProductReviews from "./Pages/Admin/Products/ProductReviews";
import AdminRoute from "./Route/AdminRoute";
import RouteLayout from "./Route/RouteLayout";




const App = () => {

  return <>
    <Router>
      <Routes>
        <Route element={<RouteLayout />}>
          <Route path="/" element={<Featured />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kid />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/search" element={<SearchProductList />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/bag" element={<Bag />} />
            <Route path="/account" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route path="dashboard" element={<AdminRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="product/:id" element={<UpdateProduct />} />
          <Route path="users" element={<UserList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="reviews" element={<ProductReviews />} />
          <Route path="order/:id" element={<ProcessOrder />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </>
}

export default App;
