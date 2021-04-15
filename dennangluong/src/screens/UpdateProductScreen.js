import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createProduct, getProduct } from "../redux/product/actions";

function UpdateProductScreen(props) {
  //   console.log(props);
  const productId =
    (props.location.search && props.location.search.split("=")[1]) || undefined;
  console.log(productId);
  const ref = useRef(false);
  const refProduct = useRef(false);
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [rating, setRating] = useState(5);
  const [numOfReviews, setNumOfReviews] = useState(0);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const user = useSelector((state) => state.user);

  console.log("updateProductScreen");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(countInStock);
    console.log(numOfReviews);
    dispatch(
      createProduct({
        _id: productId,
        name,
        category,
        brand,
        price,
        rating,
        numOfReviews,
        image,
        description,
        countInStock,
      })
    );
    props.history.push("/admin/products");
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      bodyFormData.append("name", file.name);
      setLoadingUpload(true);
      try {
        const { data } = await axios.post("/uploads", bodyFormData, {
          headers: {
            Authorization: `Bearer ${user.userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setImage(data);
        setLoadingUpload(false);
      } catch (ex) {
        setErrorUpload(ex.message);
        setLoadingUpload(false);
      }
    }
  };

  useEffect(() => {
    if (productId && !ref.current) {
      dispatch(getProduct(productId));
      ref.current = true;
    }
  }, [dispatch, productId, product, ref]);

  useEffect(() => {
    if (product.name && !refProduct.current) {
      refProduct.current = true;
      console.log("update");
      setName(product.name);
      setCategory(product.category);
      setBrand(product.brand);
      setPrice(product.price);
      setImage(product.image);
      setDescription(product.description);
      setCountInStock(product.countInStock);
    }
  }, [product, refProduct]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Product</h1>
        </div>
        {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : ( */}
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={price}
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              name="image"
              type="text"
              value={image}
              placeholder="Enter image"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="imageFile">Image File</label>
            <input
              type="file"
              id="imageFile"
              label="Choose Image"
              onChange={(e) => uploadImageHandler(e)}
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={category}
              placeholder="Enter category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={brand}
              placeholder="Enter brand"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="countInStock">Count in stock</label>
            <input
              id="countInStock"
              name="countInStock"
              type="number"
              value={countInStock}
              placeholder="Enter count in stock"
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={description}
              placeholder="Enter description"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label></label>
            <button type="submit" className="primary block">
              Save
            </button>
          </div>
        </>
        {/* )} */}
      </form>
    </div>
  );
}

export default UpdateProductScreen;
