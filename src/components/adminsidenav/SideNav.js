import React from "react";
import Logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import { MdOutlineQueueMusic } from "react-icons/md";
import { BiPhotoAlbum, BiPurchaseTagAlt } from "react-icons/bi";
import { IoIosAlbums } from "react-icons/io";
import { SiAdobepremierepro } from "react-icons/si";
import { MdAccountCircle } from "react-icons/md";
import { useAppContext } from "../../context/AppContextProvider";

const SideNav = () => {
  const { signOut } = useAppContext();
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link to="">
          <div className="brand-link">
            <img
              src={Logo}
              alt="MusicHub"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">MusicHub</span>
          </div>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/*<li className="nav-header">Music Tracks</li>*/}
              <li className="nav-item">
                <Link to="song" className="nav-link">
                  <i className="icon">
                    <FaMusic />{" "}
                  </i>
                  <p>Songs</p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="typeofsong" className="nav-link">
                  <i className="icon">
                    <MdOutlineQueueMusic />{" "}
                  </i>
                  <p>Type Of Song</p>
                </Link>
              </li>

              {/* Album */}
              {/*<li className="nav-header">Album</li>*/}
              {/*<li className="nav-item">*/}
              {/*  <Link to="albums" className="nav-link">*/}
              {/*    <i className="icon">*/}
              {/*      <BiPhotoAlbum />{" "}*/}
              {/*    </i>*/}
              {/*    <p>Album</p>*/}
              {/*  </Link>*/}
              {/*</li>*/}
              {/*<li className="nav-item">*/}
              {/*  <Link to="typeofalbum" className="nav-link">*/}
              {/*    <i className="icon">*/}
              {/*      <IoIosAlbums />{" "}*/}
              {/*    </i>*/}
              {/*    <p>Type Of Album</p>*/}
              {/*  </Link>*/}
              {/*</li>*/}

              {/*<li className="nav-header">Payment</li>*/}
              {/*<li className="nav-item">*/}
              {/*  <Link to="premium" className="nav-link">*/}
              {/*    <i className="icon">*/}
              {/*      <SiAdobepremierepro />{" "}*/}
              {/*    </i>*/}
              {/*    <p>Premium</p>*/}
              {/*  </Link>*/}
              {/*</li>*/}

              {/*<li className="nav-item">*/}
              {/*  <Link to="songpurchase" className="nav-link">*/}
              {/*    <i className="icon">*/}
              {/*      <BiPurchaseTagAlt />{" "}*/}
              {/*    </i>*/}
              {/*    <p>Song Purchase</p>*/}
              {/*  </Link>*/}
              {/*</li>*/}

              <li className="nav-header">Users</li>
              <li className="nav-item">
                <Link to="manageaccount" className="nav-link">
                  <i className="icon">
                    <MdAccountCircle />{" "}
                  </i>
                  <p>Account</p>
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-light" onClick={signOut}>Logout</button>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default SideNav;
