import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nobody } from "../../constants/AppConstants";
import { createProduct, getProduct } from "../../redux/product/actions";

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
  const [images, setImages] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(1);
  const [specification, setSpecification] = useState("");
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
        images,
        description: description
          .split("\n")
          .map((e) => `<p>${e}</p>`)
          .join(""),
        specification: specification
          .split("\n")
          .map((e) => `<p>${e}</p>`)
          .join(""),
        countInStock,
      })
    );
    props.history.push("/admin/products");
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      const bodyFormData = new FormData();
      for (let i = 0; i<files.length; i++) {
        bodyFormData.append("images", files[i]);
      }

      setLoadingUpload(true);
      try {
        const { data } = await axios.post("/uploads/images", bodyFormData, {
          headers: {
            Authorization: `Bearer ${user.userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setImages(data);
        console.log('images', data)
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
      setImages(product.images);
      setDescription(product.description);
      setSpecification(product.specification);
      setCountInStock(product.countInStock);
    } else {
      setName("");
      setCategory("");
      setBrand("");
      setPrice(0);
      setImages([]);
      setDescription("");
      setCountInStock("");
    }
  }, [product, refProduct]);

  // useEffect(() => {
  //   console.log("description", description.replaceAll("\n", "<br>"));
  // }, [description]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{nobody.product.createProduct}</h1>
        </div>
        {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : ( */}
        <>
          <div>
            <label htmlFor="name">
              {nobody.product.name}
              <span className="danger">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">
              {nobody.product.price}
              <span className="danger">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              value={price}
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="imageFile">
              {nobody.product.imageFile}
              <span className="danger">*</span>
            </label>
            <input
              type="file"
              id="imageFile"
              required
              multiple
              label={nobody.product.chooseImage}
              onChange={(e) => uploadImageHandler(e)}
            />
          </div>
          <div>
            <p>
              {images && images.map((v, k) => (
                <span key={k}>
                  {v.name} <br/>
                </span>
              ))}
            </p>
          </div>
          <div>
            <label htmlFor="category">
              {nobody.product.category}
              <span className="danger">*</span>
            </label>
            <input
              id="category"
              name="category"
              type="text"
              required
              value={category}
              placeholder="Enter category"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="brand">
              {nobody.product.brand}
              <span className="danger">*</span>
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              required
              value={brand}
              placeholder="Enter brand"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="countInStock">
              {nobody.product.countInStock}
              <span className="danger">*</span>
            </label>
            <input
              id="countInStock"
              name="countInStock"
              type="number"
              required
              value={countInStock}
              placeholder="Enter count in stock"
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="specification">
              {nobody.product.details.specification.title}
              <span className="danger">*</span>
            </label>
            <textarea
              id="specification"
              name="specification"
              type="text"
              required
              value={specification}
              placeholder="Enter description"
              rows="3"
              onChange={(e) => setSpecification(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="description">{nobody.product.description}</label>
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
              {nobody.product.save}
            </button>
          </div>
        </>
        {/* )} */}
      </form>
    </div>
  );
}

export default UpdateProductScreen;
