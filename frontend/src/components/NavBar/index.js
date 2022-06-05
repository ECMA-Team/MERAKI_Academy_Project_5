// import React from "react";
import axios from "axios"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/reducers/auth";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getSearchAction } from "../../redux/reducers/sreach";




const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [searchArray, setsearchArray] = useState([]);

  const { isLoggedIn,search } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      search:state.search.search
    };
  });

  const searchFunction = (searchInput) => {
    
    axios
      .get(`http://localhost:5000/products`)
      .then((result) => {

        searchArray(result.data.result);
        const search1 = searchArray.filter((element, index) => {
          
          return element.title.includes(search1)
        })
        console.log(search1);
        console.log(searchArray);

        // dispatch(getSearchAction(search1))

      })
      .catch((err) => {
        console.log({ err });
        console.log("search1");
      });

  };

  return (
    <div>
      {isLoggedIn ? (
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
      {/* <Link to="category">All category</Link> */}

      <input onChange={(e)=>{searchFunction(e.target.value)}}/>

    </div>
  );
};

export default Dashboard;
