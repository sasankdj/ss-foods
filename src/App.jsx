import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Signup from './pages/Signup'
import MyContextProvider from "./context/MyContextProvider"

import Home from './pages/Home'
import Navbar from "./Components/Navbar";
import Products from './pages/Products'
import Cart from './pages/Cart'
import ProductDetail from './Components/ProductDetail'
import { ToastContainer } from "react-toastify"
import Orders from './pages/Orders'
import CheckOut from './pages/CheckOut'
import Success from './pages/Success'
import TrackOrder from './pages/TrackOrder'
import Admin from './pages/admin'
import Dashboard from './pages/admin/Dashboard'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'
import AdminProducts from './pages/admin/AdminProducts'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import AdminOrderDetails from './pages/admin/AdminOrderDetails'
import AdminCategories from './pages/admin/AdminCategories'


const App = () => {
  return (
    <BrowserRouter>

      <ToastContainer position='top-right' autoClose={2000} theme='light' />
      <div>
        <MyContextProvider>
          <Navbar></Navbar>
          <Routes>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/product/:id" element={<ProductDetail />}></Route>
            <Route path="/products/:category" element={<Products />}></Route>

            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/checkout" element={<CheckOut />}></Route>
            <Route path="/success" element={<Success />}></Route>
            <Route path="/track/:id" element={<TrackOrder />}></Route>


          
            <Route path="/admin" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="orders/:id" element={<AdminOrderDetails />}/>
              <Route path="categories" element={<AdminCategories />} />
            </Route>

          </Routes>
        </MyContextProvider>
      </div>
    </BrowserRouter>
  )
}

export default App