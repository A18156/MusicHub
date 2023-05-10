import React, { useState } from "react";
import "./style.css";
import "../navigationbar/style.css";
import UserIcon from "../../images/user.png";
import { BsSearch } from "react-icons/bs";
import { BiUpload } from "react-icons/bi";
import headerImg from "../../images/Wallpaper-Engine-Steam-App.jpg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";

function Navbar() {
  const { isLogin, signOut } = useAppContext();
  const [navbarActive, setNavbarActive] = useState(false);
  const changeBG = () => {
    if (window.scrollY >= 200) {
      setNavbarActive(true);
    } else setNavbarActive(false);
  };
  window.addEventListener("scroll", changeBG);
  return (
    <div>
      <nav className={`conten-nav-r ${navbarActive ? "navbar-active" : ""}`}>
        <div className="search-box">
          <div className="search">
            <i className="bi">
              <BsSearch />
            </i>
            <input type="text" placeholder="Search Music..." />
          </div>
        </div>
        <ul>
          <li className="nav-vip">
            <Link to="premium">
              <span>vip</span>{" "}
            </Link>
          </li>
          <li className="nav-upload">
            <i>
              <BiUpload />
            </i>
          </li>
          <li>
            {isLogin ? (
              <>
                <div className="user">
                  <img src={UserIcon} alt="User" />
                </div>
                <button onClick={signOut}>Logout</button>
              </>
            ) : (
              <Link to="login">Login Now</Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="header-img">
        <img src={headerImg} alt="bg-img" />
      </div>
    </div>
  );
}

export default Navbar;
