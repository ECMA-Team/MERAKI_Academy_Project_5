import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import brand from "../../redux/reducers/brand";
import {
  getBrandsAction,
  addToBrandAction,
  deleteFromBrand,
} from "../../redux/reducers/brand";
import {
  getCategoryAction,
  addToCategoryAction,
  deleteFromCategory,
} from "../../redux/reducers/categoryAdmin";

const Getbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, isLoggedIn, category, brands, cloudinary } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        brands: state.brands.brands,
        cloudinary: state.cloudinary.cloudinary,
        category: state.category.category
      };
    }
  );
  console.log(brands);
  console.log(category);



  const getCategory = () => {
    axios
      .get(`http://localhost:5000/category`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(getCategoryAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrand = () => {
    axios
      .get(`http://localhost:5000/brand`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.result);
        dispatch(getBrandsAction(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };




  useEffect(() => {
    getCategory()
    getBrand();

  }, []);
  console.log(brands);



  return (
    <div className="filter_item" >
      <ul>
        <li>
          <a>Filter</a>
        </li>
        {brands.map((element, index) => {
          return (< div key={index}><li onClick={() => { navigate(`/allCategory/${element.brand}`) }}>{element.brand}</li>
            {category.map((elementCat, index) => {
              if (elementCat.brand_id == element.id) {
                return <div key={index}><li onClick={() => 
                  { navigate(`allCategory/${elementCat.category}/PRO/${element.brand}/${elementCat.category}`) }}>{elementCat.category}</li></div>
              } else (<></>)
            })}</div>)
        })}
      </ul>
    </div>
  );
};

export default Getbrand;
