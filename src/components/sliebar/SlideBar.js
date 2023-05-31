import React, {useEffect, useRef, useState} from "react";
import "./style.css";
import "../../App.css";
import {Link} from "react-router-dom";
import Logo from "../../images/logo.png";
import {FaMusic, FaDeezer, FaRegHeart, FaChevronRight} from "react-icons/fa";
import {AiOutlineProfile} from "react-icons/ai";
import {BiCategory} from "react-icons/bi";
import {useAppContext} from "../../context/AppContextProvider";

const navLink = [
    {icon: <FaMusic/>, name: "new", link: "../"},
    {icon: <BiCategory/>, name: "Category", link: "../category"},
    {icon: <FaDeezer/>, name: "trend", link: "../trend"},
    {icon: <FaRegHeart/>, name: "collection", link: "../collection"},
    // {icon: <AiOutlineProfile/>, name: "Account", link: "../account"},
];

function SlideBar() {
    const [open, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!open);
        console.log(open);
    }

    const [navActive, setNavActive] = useState(0);
    const toggleActive = (index) => {
        setNavActive(index);
        setOpen(!open)
    };


    let menuRef = useRef(null);

    return (
        <div>
            <div className={`nav_toggle`}>
                <div className="burger_menu" onClick={() => {
                    setOpen(i => {
                        return !i;
                    });
                }}>
                    <div className="burger_line"></div>
                    <div className="burger_line"></div>
                    <div className="burger_line"></div>
                </div>
                {/*<div className="menu-board"></div>*/}
            </div>
            <div className={`app_drawer ${open ? "opacity" : "hidden"}`} onClick={() => {
                setOpen(i => {
                    console.log("drawer", !i);
                    return !i;
                })
            }}></div>
            <div className={`navigation-left ${open ? "open" : ""}`}>
                <div className="brand">
                    <div className="brand-box" onClick={() => {
                        setOpen(i => {
                            console.log("brand box", open);
                            return !i;
                        });
                    }}>
                        <Link to={"../"} className="brand-img" onClick={() => setNavActive(0)}>
                            <img src={Logo} alt="MusicHub"/>
                            <h1 className="title_text">MusicHub</h1>
                        </Link>
                    </div>
                </div>
                <div className="left-side">
                    <div className="menu-bar">
                        <ul className="menu-links">
                            {navLink.map((val, idx) => (
                                <li key={idx} onClick={() => toggleActive(idx)}
                                    className={`${navActive === idx ? "nav-active" : ""}`}>
                                    <Link to={val.link}>
                                        <i className="icon">{val.icon}</i>
                                        <span className="title_text">{val.name}</span>
                                    </Link>
                                </li>
                            ))}
                            <li onClick={() => toggleActive(navLink.length + 1)}>

                            </li>
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
        </div>

    );
}

export default SlideBar;
