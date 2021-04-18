import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nobody } from "../../constants/AppConstants";
import { fetchOrderDetails } from "../../redux/order/actions";

function OrderDetailsScreen(props) {
  const id = props.match.params.id;
  const order = useSelector((state) => state.order);
  const { orderDetails } = order;
  const {
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDeliverd,
    deliverdAt,
    isPaid,
    paidAt,
    _id,
  } = orderDetails || {};

  const shippingAddress = orderDetails.shippingAddress || {};

  const dispatch = useDispatch();

  useEffect(() => {
    //TODO:
    if (id) {
      dispatch(fetchOrderDetails({ _id: id }));
    }
  }, []);

  return (
    <div>
      <div className="row top">
        <div className="col-2">
          <div className="card card-body">
            <div>
              <h1>{nobody.checkout.shipping}</h1>
            </div>
            <p>
              <strong>{nobody.user.name}: </strong>
              {shippingAddress.fullName}
              <br />
              <strong>{nobody.user.phone}: </strong>{shippingAddress.phone}
              <br />
              <strong>{nobody.user.address}: </strong>
              {shippingAddress.address}, {shippingAddress.county},{" "}
              {shippingAddress.city}
            </p>
          </div>
          <div className="card card-body">
            <div>
              <h1>{nobody.checkout.payment}</h1>
            </div>
            <p>
              <strong>{nobody.payment.method}:</strong> {paymentMethod}
            </p>
          </div>
          <div className="card card-body">
            <div>
              <h1>{nobody.cart.items}</h1>
            </div>
            <table className="table">
              <tbody>
                {orderItems &&
                  orderItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img className="small" src={item.image} />
                      </td>
                      <td>
                        <a href={`/products/${item._id}`}>{item.name}</a>
                      </td>
                      <td>
                        {item.quantity} x {item.price}
                      </td>
                      <td>{item.quantity * item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <h1 className="row center">{nobody.order.Summary}</h1>
            <ul>
              <li className="row">
                <span>{nobody.order.items}</span>
                <span>{itemsPrice} đ</span>
              </li>
              <li className="row">
                <span>{nobody.order.shipping}</span>
                <span>{0} đ</span>
              </li>
              <li className="row">
                <span>{nobody.order.tax}</span>
                <span>{0} đ</span>
              </li>
              <li className="row">
                <span>
                  <strong>{nobody.order.orderTotal}</strong>
                </span>
                <span>{totalPrice} đ</span>
              </li>
              {/* <li>
                <button className="block primary" onClick={orderHandler}>
                  {nobody.order.order}
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsScreen;
