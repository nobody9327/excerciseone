import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { nobody } from "../../constants/AppConstants";
import { fetchOrders } from "../../redux/order/actions";

function OrdersAdministration(props) {
  const order = useSelector((state) => state.order);
  const { orders, loading, error } = order;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{nobody.order.id}</th>
              <th>{nobody.order.admin.user}</th>
              <th>{nobody.order.orderDate}</th>
              <th>{nobody.order.total}</th>
              <th>{nobody.order.payment.title}</th>
              <th>{nobody.order.delivery.title}</th>
              <th>{nobody.order.action.title}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{'null'}</td>
                <td>{o.createdAt}</td>
                <td>{o.totalPrice.toFixed(2)}</td>
                <td>{o.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>{o.isDelivered ? o.deliveredAt.subString(0, 10) : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/admin/orders/${o._id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersAdministration;
