import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";

const AddSong = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const navigate = useNavigate();
    const {api} = useAppContext();


    var showdate = new Date();
    var today = showdate.toDateString();
    // console.log(today)
    const [songtype, setSongtype] = React.useState([]);
    const [artist, setArtist] = React.useState([]);

    React.useEffect(() => {
        api
            .get({url: "/api/songtype"})
            .then((data) => {
                // console.table(data);
                setSongtype(data);
            })
            .catch((err) => {
                console.log(err);
            });
        api.get({url:"/api/artist"})
            .then((data) =>{
            setArtist(data);
        })
            .catch((err) => {
                console.log(err);
            })
    }, [api]);
    const boodyRequest = (request) => {
        // api.post({url: "/api/songtype", body: request})
        //     .then((res) => {alert("add new type of song success");
        //         navigate("/admin/typeofsong");})
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
                                        Create
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
                                <form className="col-md-6 bg-light p-3 my-3" onSubmit={handleSubmit()}>
                                    <h1 className="text-center text-uppercase h3 py-3">
                                        Add Song
                                    </h1>

                                    <div className="form-group">
                                        <label htmlFor="name">Name Of Song</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            {...register("name", {
                                                required: "*This is required",
                                                minLength: {value: 2, message: "*Min length is 2"},
                                                maxLength: {value: 20, message: "*Max length is 20"},
                                            })}
                                        />
                                        <p>{errors.name?.message}</p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="audio">Audio</label>
                                        <input
                                            type="file"
                                            name="audio"
                                            id="audio"
                                            className="form-control-file"
                                            // className="form-control"
                                            {...register("audio", {
                                                required: "*This is required",
                                            })}
                                        />
                                        <p>{errors.audio?.message}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="imgae"
                                            className="form-control-file"
                                            {...register("image", {
                                                required: "*This is required",
                                            })}
                                        />
                                        <p>{errors.image?.message}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="artist">Artist</label>
                                        <select
                                            // size={"4"}
                                            isMulti={true}
                                            className="form-select form-control" {...register("artist", {required: "*This arist is required"})}>
                                            <option value=''> -- select an option --</option>
                                            {/*<option value="Mr">Mr</option>*/}
                                            {/*<option value="Mrs">Mrs</option>*/}
                                            {/*<option value="Miss">Miss</option>*/}
                                            {/*<option value="Dr">Dr</option>*/}
                                            {artist?.map((val, idx)=> {
                                                return(
                                                    <option key={idx} value={val.id}>{val.artistName}</option>
                                                )
                                            })}
                                        </select>
                                        <p>{errors.artist?.message}</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="songtype">Song Type</label>
                                        <select
                                            className="form-select form-control" {...register("songtype", {required: "*This song type is required"})}>
                                            <option value=''> -- select an option --</option>
                                            {/*<option value="Mr">Mr</option>*/}
                                            {/*<option value="Mrs">Mrs</option>*/}
                                            {/*<option value="Miss">Miss</option>*/}
                                            {/*<option value="Dr">Dr</option>*/}
                                            {songtype?.map((val,idx) => {
                                                return (
                                                    <option key={idx} value={val.id}>{val.name}</option>
                                                )
                                            })}
                                        </select>

                                        <p>{errors.songtype?.message}</p>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn-primary btn btn-block"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </div>
            </div>
        </div>
    );
};

export default AddSong;
