import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Cart from "./icon/cart.svg";
import UserIcon from "./icon/user.svg";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsLogged(false);
    setIsAdmin(false);
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
        
    <input type="search" id="search" placeholder="Search..." />

        </li>
        {isAdmin === false && (
          <li>
            <Link to="/history">History</Link>
          </li>
        )}
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30px" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">
            {isAdmin ? (
              "Admin"
            ) : (
              <img
                src="//theme.hstatic.net/200000374707/1000805319/14/logo.png?v=59"
                alt=""
                className="img-logo"
              />
            )}
          </Link>
        </h1>
      </div>

      <ul>
        {/* <li><Link to="/">Product</Link> </li> */}
        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">
              <img src={UserIcon} alt="" width="25px" />
            </Link>{" "}
          </li>
        )}
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30px" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
