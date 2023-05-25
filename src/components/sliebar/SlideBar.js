import React, {useEffect, useRef, useState} from "react";
import "./style.css";
import {Link} from "react-router-dom";
import Logo from "../../images/logo.png";
import {FaMusic, FaDeezer, FaRegHeart, FaChevronRight} from "react-icons/fa";
import {AiOutlineProfile} from "react-icons/ai";
import {BiCategory} from "react-icons/bi";

const navLink = [
    {icon: <FaMusic/>, name: "new", link: "../"},
    {icon: <BiCategory/>, name: "Category", link: "../category"},
    {icon: <FaDeezer/>, name: "trend", link: "../trend"},
    {icon: <AiOutlineProfile/>, name: "Account", link: "../account"},
    {icon: <FaRegHeart/>, name: "collection", link: "../collection"},
];
const useClickOutside = (handler) => {
    let domNode = useRef(null);
    useEffect(() => {
        let handleMouseDown = (e) => {
            if (!domNode.current.contains(e.target)) {
                handler();
            }
        }
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    });
    return domNode;
}

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

    const [burger_class, setBurgerClass] = useState("burger_bar unclicked");

    let menuRef = useRef(null);

    // let domNode = useClickOutside(() => {
    //     setOpen(!open);
    //     console.log("abc", open)
    // });
    return (
        <div>
            <div className={`nav_toggle`}>
                <div className="burger_menu" onClick={() => {
                    setOpen(i => {
                        console.log("bugger", !i);
                        return !i;
                    });
                }}>
                    <div className="burger_line"></div>
                    <div className="burger_line"></div>
                    <div className="burger_line"></div>
                </div>
                {/*<div className="menu-board"></div>*/}
            </div>
            <div className={`app_drawer ${open ? "visible" : "hidden"}`} onClick={() => {
                setOpen(i => {
                    console.log("drawer", !i);
                    return !i;
                })
            }}></div>
            <div className={`navigation-left ${open ? "open" : "hidden"}`}>
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
