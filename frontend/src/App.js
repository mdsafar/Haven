import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate }from "react-router-dom"
import "./App.css"
import Featured from "./Components/Pages/Featured/Featured"
import Men from "./Components/Pages/Men/Men"
import Women from "./Components/Pages/Women/Women"
import Kid from "./Components/Pages/Kid/Kid"
import Bag from "./Components/Pages/Bag/Bag"
import Contact from "./Components/Layout/Contact/Contact"
import About from "./Components/Layout/About/About"
import ProductDetails from "./Components/Pages/Products/ProductDetails"
import SearchProductList from "./Components/Pages/Products/SearchProductList"
import NotFound from "./Components/Layout/NotFound/NotFound"
import LoginSignUp from "./Components/Pages/User/LoginSignUp.js"
import Profile from "./Components/Pages/User/Profile"
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer"
import Dashboard from "./Components/Pages/Admin/Dashboard";
import ProductList from "./Components/Pages/Admin/ProductList";
import UpdateProfile from "./Components/Pages/User/UpdateProfile";
import UserList from "./Components/Pages/Admin/UserList"
import { useSelector } from "react-redux";
import NewProduct from "./Components/Pages/Admin/NewProduct";
import Shipping from "./Components/Pages/Bag/Shipping";
import ConfirmOrder from "./Components/Pages/Bag/ConfirmOrder";
import MyOrders from "./Components/Pages/Order/MyOrder";
import OrderDetails from "./Components/Pages/Order/OrderDetails";
import OrderList from "./Components/Pages/Admin/OrderList";
import ProcessOrder from "./Components/Pages/Admin/ProcessOrder";
import OrderSuccess from "./Components/Pages/Bag/OrderSuccess";
import UpdateProduct from "./Components/Pages/Admin/UpdateProduct";
import ProductReviews from "./Components/Pages/Admin/ProductReviews";



const App = () => {

const {isAuthenticated} = useSelector((state)=> state.user)

  return <>
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Featured />} />
      <Route path="/men" element={<Men />} />
      <Route path="/women" element={<Women />} />
      <Route path="/kids" element={<Kid />} />
      <Route path="/bag" element={ isAuthenticated ? <Bag /> : <Navigate to="/login"/> }/>
      <Route path="/Contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products/search" element={<SearchProductList />} />
      <Route path="/login" element={<LoginSignUp />} />
      <Route path="/account" element={ isAuthenticated ? <Profile /> : <Navigate to="/login"/> }/>
      <Route path="/me/update" element={isAuthenticated ? <UpdateProfile/> : <Navigate to="/login"/> }/>
      <Route path="/shipping" element={ isAuthenticated ? <Shipping/> : <Navigate to="/login"/> }/>
      <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder/> : <Navigate to="login"/>}/>
      <Route path="/orders" element={isAuthenticated ? <MyOrders/> : <Navigate to="login"/>}/>
      <Route path="/order/:id" element={isAuthenticated ? <OrderDetails/>: <Navigate to="login"/>}/>
      <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard/>}/>}/>
      <Route path="/admin/products" element={<ProtectedRoute element={<ProductList/>}/>}/>
      <Route path="/admin/product" element={<ProtectedRoute element={<NewProduct/>}/>}/>
      <Route path="/admin/product/:id" element={<ProtectedRoute element={<UpdateProduct/>}/>}/>
      <Route path="/admin/users" element={<ProtectedRoute element={<UserList/>}/>}/>
      <Route path="/admin/orders" element={<ProtectedRoute element={<OrderList/>}/>}/>
      <Route path="/admin/reviews" element={<ProtectedRoute element={<ProductReviews/>}/>}/>
      <Route path="/admin/order/:id" element={<ProtectedRoute element={<ProcessOrder/>}/>}/>
      <Route path="/success" element={isAuthenticated ? <OrderSuccess/> : <Navigate to='/login'/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
   </Router>
  </>
}

export default App;
