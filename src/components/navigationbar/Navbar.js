import React, {useRef, useState} from "react";
import "./style.css";
import "../../App.css";
import "../navigationbar/style.css";
import {BsSearch} from "react-icons/bs";
import {BiUpload, BiLogOutCircle, BiInfoCircle} from "react-icons/bi";
import {FaUserCircle} from "react-icons/fa";

import headerImg from "../../images/Wallpaper-Engine-Steam-App.jpg";
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContextProvider";

const avatarUrl = "../../images/avatar/";

// import imgtest from "../../images/avatar/avatar.png";

function Navbar() {
    const {isLogin, signOut} = useAppContext();
    const [navbarActive, setNavbarActive] = useState(false);
    const navigate = useNavigate();
    const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
    const {api} = useAppContext();
    const [avatarImg, setAvatarImg] = useState("");
    const dropMenu = useRef();

    const changeBG = () => {
        if (window.scrollY >= 200) {
            setNavbarActive(true);
        } else setNavbarActive(false);
    };
    const userImg = "";
    const handleOnclick = () => {
        if (isLogin === false) {
            return navigate("/login");
        }
        return navigate("/account");
    }

    React.useEffect(() => {
        if (isLogin) {
            api
                .get({url: "/api/auth/me"})
                .then((data) => {
                    // console.log("data", data);
                    setAvatarImg(avatarUrl + data?.avatar);
                    console.log(avatarImg)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isLogin]);


    window.addEventListener("scroll", changeBG);

    return (
        <div>
            <nav className={`content-nav-r ${navbarActive ? "navbar-active" : ""}`}>
                <div className="search-box">
                    <div className="search">
                        <i className="bi">
                            <BsSearch/>
                        </i>
                        <input type="text" placeholder="Search Music..."/>
                    </div>
                </div>
                <ul className="nav_item">
                    <li className="nav-upload">
                        <i className="upload_icon">
                            <BiUpload/>
                        </i>
                    </li>
                    <li>
                        {isLogin ? (
                            <>
                                <>
                                    <div className="user">
                                        <img src={avatarImg} alt="abc" onClick={() => setIsDropMenuOpen(i => {
                                            // console.log(i);
                                            return !i
                                        })}/>
                                    </div>
                                    {/*<button onClick={signOut}>Logout</button>*/}
                                    <div ref={dropMenu}
                                         className={`account_dropdown ${isDropMenuOpen ? "visible" : "hidden"}`}>
                                        <ul>
                                            <li onClick={() => navigate("/account")}>
                                                <i><BiInfoCircle/></i>
                                                <span>Info</span>
                                            </li>
                                            <li onClick={signOut}>
                                                <i><BiLogOutCircle/></i>
                                                <span onClick={signOut}>Logout</span>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            </>
                        ) : (
                            // <Link to="login">Login Now</Link>
                            <>
                                <i className="login_icon" onClick={handleOnclick}><FaUserCircle/></i>
                            </>

                        )}

                    </li>
                </ul>
            </nav>
            <div className=""
                 style={{
                     height: `300px`,
                     width: `100%`,
                     backgroundSize:`cover`,
                     backgroundPosition:`center`,
                     backgroundImage: `url(${require('../../images/Wallpaper-Engine-Steam-App.jpg')})`
                 }} >
                {/*<img src={headerImg} alt="bg-img"/>*/}
            </div>
        </div>
    );
}

export default Navbar;
