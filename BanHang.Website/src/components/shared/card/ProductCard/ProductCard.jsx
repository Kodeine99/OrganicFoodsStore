import React from "react";
import ReactStars from "react-rating-stars-component";
import { BtnAddCart } from "../../button/AddtoCart";
import { Link } from "react-router-dom";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const ratingConfig = {
  size: 20,
  isHalf: true,
  emptyIcon: <FaRegStar />,
  halfIcon: <FaStarHalfAlt />,
  filledIcon: <FaStar />,
  edit: false,
};

function ProductCard({ productName, rate, price, imgUrl, productId }) {
  return (
    <div className="productCard position-relative">
      <div className="productCard__img">
        <Link to={`/product-detail/${productId}`}>
          <img src={process.env.PUBLIC_URL + imgUrl} alt="" />
        </Link>
      </div>
      <div className="productCard__info">
        <Link to={"/product-detail"}>
          <h5 className="product__name">{productName}</h5>
        </Link>
        <span className="product__price font-weight-bold">
          {price.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
        </span>
        <div className="product__rating d-flex justify-content-center ">
          <ReactStars
            classNames={"justify-content-center"}
            {...ratingConfig}
            value={rate}
          />
        </div>
      </div>
      <div className="productCard__action">
        <BtnAddCart title="Add to cart" productId={productId} Quantity={1}/>

        {/* <AddToCartModal show={modalShow} onHide={() => setModalShow(false)} /> */}
      </div>
    </div>
  );
}

export default ProductCard;
