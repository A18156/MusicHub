import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";

const UpdateSongType = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {id} = useParams();
    const [name, setName] = React.useState("");

    const navigate = useNavigate();
    const {api} = useAppContext();
    React.useEffect(() => {
        api
            .get({url: "/api/songtype/" + id})
            .then((data) => {
                setName(data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [api]);
    const boodyRequest = (request) => {
        api.put({url: "/api/songtype/"+id, body: request})
            .then((res) => {
                alert("update type of song success");
                navigate("/admin/typeofsong");
            })
    }

    return (
        <div>
            <div className="edit-background">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4">
                                <Link to="../../admin">
                                    <div className="brand-link">
                                        <img
                                            src={Logo}
                                            alt="MusicHub"
                                            className="brand-image img-circle elevation-3"
                                            style={{opacity: ".8"}}
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="col-sm-8">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="" className="breadcrumb-item">
                                        Type Of Song
                                    </Link>
                                    <li className="breadcrumb-item active">
                                        <Link
                                            to="../admin/musictracks"
                                            className="breadcrumb-item edit-top-link"
                                        >
                                            Song
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link
                                            to="../../admin"
                                            className="breadcrumb-item edit-top-link"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                </ol>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                        <div className="container">
                            <div className="row justify-content-around">
                                <form className="col-md-6 bg-light p-3 my-3" onSubmit={handleSubmit(boodyRequest)}>
                                    <h1 className="text-center text-uppercase h3 py-3">
                                        Add Song&apos;s Type
                                    </h1>
                                    <div className="form-group">
                                        <label htmlFor="songtypeid">
                                            ID
                                        </label>
                                        <input
                                            type="text"
                                            name="songtypeid"
                                            id="songtypeid"
                                            className="form-control"
                                            disabled={true}
                                            defaultValue={id}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="songtype">Song Type</label>
                                        <input
                                            type="text"
                                            name="songtype"
                                            id="songtype"
                                            className="form-control"
                                            defaultValue={name}
                                            {...register("name", {
                                                required: "*This is required",
                                                minLength: {value: 2, message: "*Min length is 2"},
                                                maxLength: {value: 20, message: "*Max length is 20"},
                                            })}
                                        />
                                        <p>{errors.name?.message}</p>
                                    </div>

                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn-primary btn btn-block"
                                    />
                                    <input
                                        type="button"
                                        value="cancel"
                                        className="btn-light btn btn-block btn-update-admin"
                                        onClick={() => navigate("/admin/typeofsong")}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSongType;
