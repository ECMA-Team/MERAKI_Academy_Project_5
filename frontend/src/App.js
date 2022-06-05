import "./App.css";
import Dashboard from "./components/NavBar";
import Register from "./components/register/index";
import Login from "./components/login/index";
import Product from "./components/product/index";
import Cart from "./components/cart";
import OneProduct from "./components/oneProduct";
import Brand from "./components/brand/beands";
import Category from "./components/Category/category";
import CategoryAdmin from "./components/categoryAdmin";
import { Routes, Route } from "react-router-dom";
import CatByBrand from "./components/CatByBrand";
import ProCB from "./components/ProCB";


function App() {

  return (
    <div className="App">
  
        Welcome APP
        <Dashboard />
        <Routes>
      
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product/:id" element={<OneProduct />}></Route>
          <Route path="/" element={<Brand />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/category/Admin" element={<CategoryAdmin />}></Route>
          <Route path="/allCategory/:brand" element={<CatByBrand />}></Route>
          <Route
            path="/allCategory/:brand/PRO/:brand/:category"
            element={<ProCB />}
          ></Route>
        </Routes>
     
     
   
    </div>
  );
}

export default App;
