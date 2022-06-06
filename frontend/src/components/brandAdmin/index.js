import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrandsAction,
  addToBrandAction,
  deleteFromBrand,
} from "../../redux/reducers/brand";

const BrandAdmin = () => {
  //! redux =========
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState("");

  const { token, isLoggedIn, category, brands } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      brands: state.brands.brands,
    };
  });
  console.log(brands);
  //! redux =========
  const navigate = useNavigate();

  const getBrandAdmin = () => {
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

  const deleteBrandAdmin = (id) => {
    axios
      .delete(`http://localhost:5000/brand/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        dispatch(deleteFromBrand(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addCategoryAdmin = (categoryName) => {
    axios
      .post(
        `http://localhost:5000/brand`,
        { brand: categoryName },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        dispatch(
          addToCategoryAction({
            id: result.data.result.insertId,
            category: categoryName,
            is_deleted: 0,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getBrandAdmin();
  }, []);

  return (
    <div className="BrandAdmin">
      <div className="category_contener">
        <table style={{ border: "1px solid black", display: "inline-block" }}>
          <tr>
            <th style={{ borderRight: "1px solid black" }}>#</th>
            <th style={{ borderRight: "1px solid black" }}>Brand image </th>
            <th style={{ borderRight: "1px solid black" }}>Brand Name </th>

            {/* <th style={{ borderRight: "1px solid black" }}>Edit</th> */}
            <th /* style={{borderRight:"1px solid black"}} */>Actions</th>
          </tr>
          {/* <tr> */}
          {brands.length &&
            brands.map((element, index) => {
              return (
                <tr key={index}>
                  <td style={{ border: "1px solid black" }}>{index + 1}</td>
                  <td style={{ border: "1px solid black" }}>{element.image}</td>
                  <td style={{ border: "1px solid black" }}>{element.brand}</td>
                  <td style={{ border: "1px solid black", cursor: "pointer" }}>
                    <button
                      onClick={() => {
                        deleteBrandAdmin(element.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>

                  {/*                   
                  <td style={{ border: "1px solid black", cursor: "pointer" }}>
                    <p
                      onClick={() => {
                        deleteCategoryAdmin(element.id);
                      }}
                    >
                      sub_category
                    </p>
                  </td>

                  <td style={{ border: "1px solid black", cursor: "pointer" }}>
                    <p
                      onClick={() => {
                        deleteCategoryAdmin(element.id);
                      }}
                    >
                      Delete
                    </p>
                  </td> */}
                </tr>
              );
            })}
        </table>
      </div>

      <h6>Add Brand</h6>
      <input
        className="brand_image"
        placeholder="brand_image"
        onChange={(e) => {
          /* setCategoryName(e.target.value) */
        }}
      />
      <input
        type="text"
        className="brand_Name"
        placeholder="brand_Name"
        onChange={(e) => {
          /* setCategoryName(e.target.value) */
        }}
      />
      <button
        className="add_category"
        onClick={() => {
          /* addCategoryAdmin(categoryName); */
        }}
      >
        Add Brand{" "}
      </button>
    </div>
  );
};

export default BrandAdmin;
