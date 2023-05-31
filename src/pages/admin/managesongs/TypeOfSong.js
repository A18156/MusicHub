import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";

const TypeOfSong = () => {
    const navigate = useNavigate();
    const [typeOfSong, setTypeOfSong] = React.useState([]);
    const {api} = useAppContext();

    const getAll = () => {
    }
    React.useEffect(() => {
        api
            .get({url: "/api/songtype"})
            .then((data) => {
                setTypeOfSong(Object?.values(data)[2]);
                // console.log("test",typeOfSong);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [api]);

    const handleDelete = (id) => {
        if (window.confirm("are you sure")) {
            console.log(id)
            api.delete({url: "/api/songtype/" + id});
        }
    }


    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 title-color">Type Of Songs</h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="" className="breadcrumb-item">
                                        Type Of Songs
                                    </Link>
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        <div>
                            <button className="btn btn-primary"
                                    onClick={() => navigate("/admin/typeofsong/addsongtypes")}
                            >Add Song Type
                            </button>
                        </div>
                        {/* <br /> */}
                        <table className="tbl-full table table-striped ">
                            <thead>
                            <tr>
                                <th>No.</th>
                                <th>Song Type</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {typeOfSong?.map((val, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>
                                            <button
                                                className="btn-update-admin btn btn-light"
                                                onClick={() => navigate(`/admin/typeofsong/${val.id}`)}
                                            >
                                                Update
                                            </button>
                                            {/* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> */}
                                            <button className="btn-delete-admin btn btn-light"
                                                    onClick={() => handleDelete(val.id)}>
                                                Delete
                                            </button>
                                            {/* <a href="#" className="btn-delete-admin btn btn-light">Delete</a> */}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>

                        {/* /.row (main row) */}
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>
    );
};

export default TypeOfSong;
