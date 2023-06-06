import React from "react";
// import SideNav from "../../../components/adminsidenav/SideNav";
import { FiMusic, FiUsers } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi"
import { SiAdobepremierepro } from "react-icons/si"
import {useAppContext} from "../../../context/AppContextProvider";

function Home() {
  return (
    <div>

      {/* <SideNav /> */}

      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0" >Dashboard</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Admin</a></li>
                  <li className="breadcrumb-item active">Home</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>Tracks</p>
                  </div>
                  <div className="icon">
                    <h1><FiMusic size='4rem' /></h1>
                  </div>
                  <a href="#" className="small-box-footer">More Details <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                    <p>Finance</p>
                  </div>
                  <div className="icon">
                    <h1><GiReceiveMoney size='4rem' /></h1>
                  </div>
                  <a href="#" className="small-box-footer">More Details <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>44</h3>
                    <p>Users</p>
                  </div>
                  <div className="icon">
                    <h1><FiUsers size='4rem' /></h1>
                  </div>
                  <a href="#" className="small-box-footer">More Details <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Premium</p>
                  </div>
                  <div className="icon">
                    <h1><SiAdobepremierepro size='4rem' /></h1>
                  </div>
                  <a href="#" className="small-box-footer">More Details <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
            </div>
            {/* /.row */}
            {/* Main row */}
            <div className="row">
              {/* /.Left col */}
              {/* right col */}
            </div>
            {/* /.row (main row) */}
          </div>{/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>

    </div>
  );
}

export default Home;
