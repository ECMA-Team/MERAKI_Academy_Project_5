import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/reducers/auth";

import "./style.css";

const Product = () => {
  //! redux =========
  // const array = ["a", "s", "u", "y", "a", "a", "a", "a", "a", "a",]

  const dispatch = useDispatch();

  const state = useSelector((state) => {


    return {
      search: state.search.search
    };
  });

  const { token, isLoggedIn } = useSelector((state) => {
    // console.log(state);

    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,

    };
  });
  //! redux =========
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const gitAllProduct = () => {
    axios
      .get(`http://localhost:5000/products/pagination/${page}`)
      .then((result) => {
        setProducts(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    await axios
      .post(
        `http://localhost:5000/cart`,
        {
          productId: id,
          quantity: 1,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(token);
        console.log(err);
      });
  };

  useEffect(gitAllProduct, [page]);

  return (
    <div>

      <select name="" id="" >
        {state.search.length && state.search.map((element, index) => {

          return <option value={index}  key={index}><>{element.title} {element.image}</></option>
        })
        })
      </select>


      <div className="products">
        {products.length &&
          products.map((e, i) => {
            return (
              <div key={i} className="one_product">
                <img
                  onClick={() => {
                    navigate(`/product/${e.id}`);
                  }}
                  src={`${e.image}`}
                />
                <div className="information">
                  <div>
                    {" "}
                    {e.title}
                    {e.price}
                  </div>
                  <button
                    className="add_to_cart"
                    onClick={() => {
                      console.log(e.id);
                      addToCart(e.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {page != 1 ? (
        <>
          <button
            className="next"
            onClick={() => {
              setPage(page - 1);
              gitAllProduct();
              console.log(page);
            }}
          >
            back
          </button>
        </>
      ) : (
        <></>
      )}
      {page != 3 ? (
        <>
          <button
            className="next"
            onClick={() => {
              setPage(page + 1);
              gitAllProduct();
              console.log(page);
            }}
          >
            next
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Product;
