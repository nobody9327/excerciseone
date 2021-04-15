import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createProduct, getProducts } from "../redux/product/actions";
import { CREATE_PRODUCT_RESET } from "../redux/product/constants";

function ProductsAministration(props) {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  // console.log("products", products);

  const dispatch = useDispatch();
  const editProduct = (id) => {
    //TODO:
    props.history.push(`/admin/product?id=${id}`);
  };

  const deleteProduct = (id) => {
    //TODO:
  };

  const createProductHanler = () => {
    //TODO:
    // dispatch(createProduct());
    props.history.push("/admin/product");
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CREATE_PRODUCT_RESET });
      props.history.push(`/admin/product?id=${createdProduct._id}`);
    }
    dispatch(getProducts);
  }, [dispatch, successCreate]);

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button className="primary" onClick={createProductHanler}>
          Create product
        </button>
      </div>
      {loadingCreate ? (
        <LoadingBox></LoadingBox>
      ) : (
        errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="small"
                    onClick={(e) => editProduct(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="small"
                    onClick={(e) => deleteProduct(product._id)}
                  >
                    Delete
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

export default ProductsAministration;
