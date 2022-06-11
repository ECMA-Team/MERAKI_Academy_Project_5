import axios from "axios";
import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

import { loginAction } from "../../redux/reducers/auth";

const OneProduct = () => {
  const [product, setProduct] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [user_id, setUser_id] = useState(0);
  const { id } = useParams();
  const [number, setNumber] = useState(3);
  const [updateBox, setUpdateBox] = useState(false);
  const [feedbackId, setfeedbackId] = useState(0);
  //? ======Rate=================
  const stars = [1, 1, 1, 1, 1];
  const [rate, setRate] = useState(0);
  const [allRate, setAllRate] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const img = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  //? ======Rate=================

  //! redux =========
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //! redux =========
  const oneProduct = () => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setProduct(result.data.result);
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
  const getFeedback = (id) => {
    axios
      .get(`http://localhost:5000/feedback/${id}`)
      .then((result) => {
        console.log(result.data.result);

        setFeedback(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addFeedback = (feedback) => {
    axios
      .post(
        "http://localhost:5000/feedback",
        { product_id: id, feedback },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        console.log(result);
        getFeedback(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFeedback = (feedback_id) => {
    axios
      .delete(`http://localhost:5000/feedback/${feedback_id}`, {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log({ feedback_id });
        console.log(result.data);

        getFeedback(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserId = () => {
    axios
      .get("http://localhost:5000/feedback/user/id", {
        headers: {
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        console.log(result.data);
        setUser_id(result.data.user_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateFeedback = (feedback, feedback_id) => {
    axios
      .put(
        `http://localhost:5000/feedback/`,
        {
          feedback,
          id: feedback_id,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        console.log(result);
        getFeedback(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clickStar = (index) => {
    setCurrentValue(index);
    axios
      .post(
        "http://localhost:5000/rate",
        { product_id: id, rate: index, user_id: user_id },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getAllRate();
  };
  const getAllRate = () => {
    axios
      .get(`http://localhost:5000/rate/${id}`)
      .then((result) => {
        console.log({ getAllRate: result.data.result });
        setAllRate(result.data.result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const calculationRate = () => {
    let totalRate = 0;
    allRate.forEach((element, index) => {
      totalRate = totalRate + element.rate;
    });
    let avgRate = totalRate / allRate.length;
    setRate(avgRate);
    console.log({ avgRate: avgRate });
  };

  useEffect(oneProduct, []);
  useEffect(() => {
    getFeedback(id);
  }, []);
  useEffect(getUserId, []);
  useEffect(getAllRate, []);
  useEffect(calculationRate, [allRate]);

  return (
    <div>
      <div>
        {product.length &&
          product.map((e, i) => {
            return (
              <div key={i} className="only_product">
                <div>
                  <img src={`${e.image}`} />
                  {/* //!rate========================== */}
                  <p>Add Rate:</p>
                  {stars.map((e, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={24}
                        onClick={() => {
                          clickStar(index + 1);
                        }}
                        onMouseOver={() => {
                          setHoverValue(index + 1);
                        }}
                        onMouseLeave={() => {
                          setHoverValue(undefined);
                        }}
                        color={
                          (hoverValue || currentValue) > index
                            ? "#FFBA5A"
                            : "#a9a9a9"
                        }
                        style={{
                          marginRight: 10,
                          cursor: "pointer",
                        }}
                      />
                    );
                  })}
                </div>
                <div className="detals">
                  {/* //!=================Rate================= */}
                  {/* //? الي فووووووووووووووووووووووووووووووووووووووووق */}
                  <div>
                    {stars.map((e, index) => {
                      return (
                        <FaStar
                          key={index}
                          size={24}
                          color={rate > index ? "#FFBA5A" : "#a9a9a9"}
                          style={{
                            marginRight: 10,
                            cursor: "pointer",
                          }}
                        />
                      );
                    })}
                  </div>
                  {/* //!================= End Rate================= */}

                  <p>{"Title  :" + e.title}</p>
                  <p>{"Description  : " + e.description}</p>
                  <p>{"Price : " + e.price}</p>
                  <button
                    className="add_to_cart"
                    onClick={() => {
                      console.log("e");
                      addToCart(e.id);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })}

        {/* //!=============================feedback============================= */}
        <div>
          {feedback.length &&
            feedback.slice(0, number).map((element, index) => {
              return (
                <div key={index}>
                  <div className="feedback_div">
                    <img className="imge_feedback" src={`${img}`} />
                    <p className="firstName_feedback">{element.firstName} </p>
                    <p className="feedpact">{element.feedback}</p>
                    <p className="rr"></p>
                    {user_id == element.user_id ? (
                      <>
                        {updateBox && feedbackId == element.id && (
                          <input
                            className="input_update_feedback"
                            onChange={(e) => {
                              setNewFeedback(e.target.value);
                            }}
                          />
                        )}
                        <button
                          className="button_update_feedback"
                          onClick={() => {
                            setfeedbackId(element.id);
                            setUpdateBox(!updateBox);

                            updateFeedback(newFeedback, element.id);
                          }}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                    {user_id == element.user_id ? (
                      <button
                        className="button_delete_feedback"
                        onClick={() => {
                          deleteFeedback(element.id);
                        }}
                      >
                        Delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              );
            })}

          <div className="new_feedback">
            <img className="imge_feedback2" src={`${img}`} />
            <input
              className="input_addfeedback"
              placeholder="add feedback"
              onChange={(e) => {
                setNewFeedback(e.target.value);
              }}
            />

            <button
              className="button_addFeedback"
              onClick={() => {
                addFeedback(newFeedback);
              }}
            >
              Add Feedback
            </button>
          </div>
        </div>
      </div>

      <div>
        <button className="see"
          onClick={() => {
            setNumber(number + 3);
          }}
        >
    
          See More
        </button>
        <button className="see"
          onClick={() => {
            setNumber(3);
          }}
        >
          See Less
        </button>
      </div>
    </div>
  );
};

export default OneProduct;
