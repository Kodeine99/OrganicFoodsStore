import React from "react";
import { FiX, FiSearch, FiShoppingCart } from "react-icons/fi";
import {
  FaRegUser,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MobileMenu({ show, setShow }) {
  const carts = useSelector((state) => state.cart.cartResult);
  return (
    <>
      <div
        className={
          show === false
            ? "mobile-menu  mobile-menu-show"
            : "mobile-menu  mobile-menu-show mobile-menu--open"
        }
      >
        <div className="mobile-menu__top">
          <span className="mobile-menu__top--text"></span>
          <button
            className="mobile-menu__top--close"
            onClick={() => setShow(false)}
          >
            <FiX />
          </button>
        </div>
        <div className="mobile-menu__inner">
          <form action="#" method="post" className="header-search m-tb-15">
            <div type="text" className="header-search__content pos-relative">
              <input
                type="search"
                name="header-search"
                placeholder="Seacrh our store"
                required
              />
              <button className="pos-absolute" type="submit">
                <FiSearch />
              </button>
            </div>
          </form>
          {/* Mobile menu action icons */}
          <ul className="header__user-action-icon m-tb-15 text-center">
            <li>
              <Link to="/userProfile">
                <FaRegUser />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <FiShoppingCart />
                <span className="item-count pos-absolute">
                  {carts && carts.length}
                </span>
              </Link>
            </li>
          </ul>
          {/* Mobile menu nav link */}
          <div className="mobile-menu-nav-link">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/product">Products</Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact us</Link>
              </li>
            </ul>
          </div>
          {/* Mobile menu socials nav */}
          <ul className="mobile-menu__social-nav m-t-50">
            <li className="mobile-menu__social-list">
              <Link className="mobile-menu__social-link">
                <FaFacebookF />
              </Link>
            </li>
            <li className="mobile-menu__social-list">
              <Link className="mobile-menu__social-link">
                <FaTwitter />
              </Link>
            </li>
            <li className="mobile-menu__social-list">
              <Link className="mobile-menu__social-link">
                <FaYoutube />
              </Link>
            </li>
            <li className="mobile-menu__social-list">
              <Link className="mobile-menu__social-link">
                <FaGooglePlusG />
              </Link>
            </li>
            <li className="mobile-menu__social-list">
              <Link className="mobile-menu__social-link">
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          show === false
            ? "mobile-menu-overlay mobile-menu-overlay--hide"
            : "mobile-menu-overlay mobile-menu-overlay--show"
        }
        onClick={() => setShow(false)}
      ></div>
    </>
  );
}
