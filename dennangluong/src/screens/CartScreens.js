import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import TestComponent from "../components/TestComponent";
import { nobody } from "../constants/AppConstants";
import { getCart, updateCart } from "../redux/cart/actions";
import { UPDATE } from "../redux/cart/constants";

function CartScreens(props) {
  const productId = props.match.params.id;
  const quantity = props.location.search && props.location.search.split("=")[1];

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const { cartItems, loading, error } = cart;

  const dispatch = useDispatch();

  const modifyQuantityHandler = (id, qty) => {
    dispatch(updateCart(UPDATE, id, qty, userInfo.token));
  };

  const checkOutHandler = (e) => {
    e.preventDefault();
    props.history.push("/shipping");
  };

  useEffect(() => {
    if (userInfo && userInfo.token) dispatch(getCart(userInfo.token));
  }, [dispatch, userInfo]);

  if (loading) {
    return <LoadingBox></LoadingBox>;
  } else if (error) {
    return <MessageBox>{error}</MessageBox>;
  } else if (!cartItems || cartItems.length === 0) {
    return (
      <MessageBox variant="info">
        Cart is empty. <Link to="/">Go Shopping</Link>
      </MessageBox>
    );
  }

  return (
    <div className="row top">
      <div className="col-2">
      <div>
        <h1>{nobody.cart.title}</h1>
      </div>
        <table className="table">
        <tbody>
        {cartItems.map((item) => (
            <tr key={item._id} >
              <td><img className="small" src={item.images && item.images[0].url} alt={item.name} /></td>
              <td><span>{item.name}</span></td>
              {/* <TestComponent></TestComponent> */}
              <td>
                <div className="group-input">
                <button
                  className="small"
                  disabled={item.quantity <= 0}
                  onClick={() =>
                    modifyQuantityHandler(item._id, item.quantity - 1)
                  }
                >
                  <span className="fa fa-minus"></span>
                </button>
                <input
                  type="number"
                  className="small"
                  value={item.quantity}
                  onChange={(e) =>
                    modifyQuantityHandler(item._id, e.target.value)
                  }
                ></input>
                <button
                  className="small"
                  onClick={() =>
                    modifyQuantityHandler(item._id, item.quantity + 1)
                  }
                >
                  <span className="fa fa-plus"></span>
                </button>
              </div>
              </td>
              {/* <select
                value={item.quantity}
                onChange={(e) =>
                  modifyQuantityHandler(item._id, e.target.value)
                }
              >
                {[...Array(item.countInStock).keys()].map((k) => (
                  <option key={k + 1}>{k + 1}</option>
                ))}
              </select> */}
              <td><p>{item.price} <span style={{'textDecoration': 'underline'}}>đ</span></p></td>
              <td><button onClick={(e) => modifyQuantityHandler(item._id)}>
                {nobody.action.delete}
              </button></td>
            </tr>
          ))}
        </tbody>
        </table>
        {/* <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="row">
              <img className="small" src={item.image} alt={item.name} />
              <div className="min-30">
                <span>{item.name}</span>
              </div>
              <div className="group-input">
                <button
                  className="small"
                  disabled={item.quantity <= 0}
                  onClick={() =>
                    modifyQuantityHandler(item._id, item.quantity - 1)
                  }
                >
                  <span className="fa fa-minus"></span>
                </button>
                <input
                  type="number"
                  class="small"
                  value={item.quantity}
                  onChange={(e) =>
                    modifyQuantityHandler(item._id, e.target.value)
                  }
                ></input>
                <button
                  className="small"
                  onClick={() =>
                    modifyQuantityHandler(item._id, item.quantity + 1)
                  }
                >
                  <span className="fa fa-plus"></span>
                </button>
              </div>
              
              <p>${item.price}</p>
              <button onClick={(e) => modifyQuantityHandler(item._id)}>
                {nobody.action.delete}
              </button>
            </li>
          ))}
        </ul> */}
        {/* <select
                value={item.quantity}
                onChange={(e) =>
                  modifyQuantityHandler(item._id, e.target.value)
                }
              >
                {[...Array(item.countInStock).keys()].map((k) => (
                  <option key={k + 1}>{k + 1}</option>
                ))}
              </select> */}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <div className="row">
            <h2>
              {nobody.cart.subTotal} ({cartItems.length} {nobody.cart.items}):
            </h2>
            <h2>
              {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)} <span style={{'textDecoration': 'underline'}}>đ</span>
            </h2>
          </div>
          <button className="primary block" onClick={checkOutHandler}>
            {nobody.cart.checkout}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreens;
