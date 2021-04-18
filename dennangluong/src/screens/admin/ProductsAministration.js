import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { nobody } from "../../constants/AppConstants";
import { deleteProduct, getProducts } from "../../redux/product/actions";
import { CREATE_PRODUCT_RESET } from "../../redux/product/constants";

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

  // console.log("products", products);
  const dispatch = useDispatch();
  const editProduct = (id, e) => {
    e.preventDefault();
    //TODO:
    props.history.push(`/admin/product?id=${id}`);
  };

  const deleteProductHandler = (id) => {
    //TODO:
    dispatch(deleteProduct(id));
  };

  const createProductHanler = () => {
    //TODO:
    // dispatch(createProduct());
    props.history.push("/admin/product");
  };

  useEffect(() => {
    if (successCreate) {
      dispatch(getProducts());
      dispatch({ type: CREATE_PRODUCT_RESET });
      // props.history.push(`/admin/product?id=${createdProduct._id}`);
    }
  }, [dispatch, successCreate]);

  return (
    <div>
      <div className="row">
        <h1>{nobody.product.product}</h1>
        <button className="primary" onClick={createProductHanler}>
          {nobody.product.createProduct}
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
              <th>{nobody.product.name}</th>
              <th>{nobody.product.price}</th>
              <th>{nobody.product.category}</th>
              <th>{nobody.product.brand}</th>
              <th>{nobody.product.status.title}</th>
              <th>{nobody.product.action}</th>
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
                <td>{product.active ? nobody.product.status.active : nobody.product.status.deActive}</td>
                <td>
                  <button
                    className="small"
                    onClick={(e) => editProduct(product._id, e)}
                  >
                    {nobody.product.edit}
                  </button>
                  <button
                    className="small"
                    onClick={(e) => deleteProductHandler(product._id)}
                  >
                    {nobody.product.delete}
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
