import Register from "./register";
import axios from "axios";
import Login from "./login";
import Product from "./product/uu";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/reducers/auth";
import Brand from "./brand/beands";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react";
import { getSearchAction } from "../redux/reducers/search"


const Dashboard = () => {
  const [searchs, setSearchs] = useState([]);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const state = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      search: state.search.search
    };
  });





  const search = (searchInput) => {
    axios
      .get(`http://localhost:5000/products`)
      .then((result) => {
        // console.log(result.data.result);

        setProduct(result.data.result);
        const search1 = product.filter((element, index) => {
          return element.title.includes(searchInput)


        })
        // console.log(search1);
        dispatch(getSearchAction(search1))
        // console.log(getSearchAction(search1));
        console.log(state.search);
      })
      .catch((err) => {
        console.log({ err });
      });

  };



  return (
    <div>
      {state.isLoggedIn ? (
        <>
          <Link to="/cart">Cart</Link>
          <button
            className="logout"
            onClick={() => {
              dispatch(logoutAction());
              navigate("/");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign up</Link>
        </>
      )}

      <Link to="product">All Product</Link>
      <Link to="/">All Brand</Link>
      <Link to="category">All category</Link>

      <input placeholder={
        <select name="" id="" >
          {state.search.length && state.search.map((element, index) => {

            return <option value={index} key={index}><>{element.title} {element.image}</></option>
          })
          }
        </select>} onChange={(e) => { search(e.target.value) }} />
       
 
    </div>
  );
};

export default Dashboard;

// const searchProductByName = (searchInput) => {
//   axios
//   .get("http://localhost:5000/products")
//   .then((result) => {
//     console.log(result.data.products);
//     setProduct(result.data.products);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });


//   const search = product.filter((element, index) => {
//     console.log(searchInput);
//     return element.title.includes(searchInput);
//   });
//   console.log(search);
//   setSearchArray(search);
//   setFilterArray([]);
//   setProductSorted([]);
// };
