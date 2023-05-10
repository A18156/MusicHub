import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./style.css";


const MusicTracks = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 title-color">Songs</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="" className="breadcrumb-item">Songs</Link>
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
                        <div>
                            <button className="btn btn-primary" onClick={() => navigate("/admin/song/addsong")}  >
                                Add Song
                            </button>
                        </div>
                        {/* <br /> */}
                        <table className="tbl-full table table-striped ">
                            <thead >
                                <tr >
                                    <th>No. </th>
                                    <th>Song Name</th>
                                    <th>Singer</th>
                                    <th>Song Type</th>
                                    <th>State</th>
                                    <th>Upload Date</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr >
                                    <td>1.</td>
                                    <td>On My Way</td>
                                    <td>J9</td>
                                    <td>EDM</td>
                                    <td>Active</td>
                                    <td>Today</td>
                                    <td>#</td>
                                    <td>100.000</td>
                                    <td>
                                        <Link to="../../addtracks" className="btn-update-admin btn btn-light">Update</Link>
                                        {/* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> */}
                                        <Link to="" className="btn-delete-admin btn btn-light">Delete</Link>
                                        {/* <a href="#" className="btn-delete-admin btn btn-light">Delete</a> */}
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        {/* /.row (main row) */}
                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>
    )
}

export default MusicTracks
