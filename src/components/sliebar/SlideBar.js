import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import { FaMusic, FaDeezer, FaRegHeart, FaChevronRight } from "react-icons/fa";
import { AiOutlineProfile } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

const navLink = [
  { icon:<FaMusic/>, name: "new",link:"../" },
  { icon:<BiCategory/>, name: "Category" ,link:"../category"},
  { icon:<FaDeezer/>, name: "trend",link:"../trend" },
  // { icon:<AiOutlineProfile/>, name: "Account" ,link:"../account"},
  { icon:<FaRegHeart/>, name: "collection", link:"../collection" }
];
function SlideBar() {
  const [open, setOpen] = useState(false);
  // const toggle = () => setOpen(!open);

  const [navActive, setNavActive] = useState(0);
  const toggleAcitve = (index) => setNavActive(index);

  return (
    // <div className={`navigation-left ${open ? "open" : ""}`}>
    <div className="navigation-left">
      <div className="brand">
        <div className="brand-box">
          <Link to={"../"} className="brand-img" onClick={()=>setNavActive(0)}>
            <img src={Logo} alt="MusicHub" />
            <h1 className="hide-text">MusicHub</h1>
          </Link>
        </div>
      </div>
      <div className="left-side">
        <div className="menu-bar">
          <ul className="menu-links">
            {navLink.map((val, idx) => (
              <li key={idx} onClick={() => toggleAcitve(idx)} className={`${navActive === idx ? "nav-active" : ""}`}>
                <Link to={val.link}>
                  <i className="icon">{val.icon}</i>
                  <span className="hide-text">{val.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/*<div className="bottom-sidebar">*/}
        {/*  <i className="toggle" onClick={toggle}>*/}
        {/*    <FaChevronRight />*/}
        {/*  </i>*/}
        {/*  <div className="menu-board"></div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default SlideBar;
