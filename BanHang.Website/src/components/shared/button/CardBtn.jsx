import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import React from "react";
//Btn Cart
export function BtnShoppingGreen(props) {
  return (
    <>
      <Link to={"/Product"} className="btn--green text-center font-weight-bold p-3">
        {props.title}
      </Link>
    </>
  );
}
export function BtnClearCart(props) {
  return (
    <>
      <button className="btn--black2 text-center font-weight-bold p-3" onClick={props.onClick}>
        {props.title}
        <FiShoppingCart className="m-l-5" />
      </button>
    </>
  );
}
export function BtnUpdateCart(props) {
  return (
    <>
      <button onClick={props.onClick} className="btn--update-cart text-center font-weight-bold p-3">
        {props.title}
        <FiShoppingCart className="m-l-5" />
      </button>
    </>
  );
}

export function BtnBuyItNow(props) {
  return (
    <>
      <Link to={"/check-out"} className="btn-buy-cart d-block text-center">
        {props.title}
      </Link>
    </>
  );
}
export function BtnCheckOut(props) {
  return (
    <>
      <Link onClick={props.onClick} to={props.path} className="btn-buy-cart d-block text-center">
        {props.title}
      </Link>
    </>
  );
}
export function BtnContinuedShopping(props) {
  return (
    <>
      <Link onClick={props.onClick} to={props.path} className="btn-continued-shopping d-block text-center">
        {props.title}
      </Link>
    </>
  );
}
