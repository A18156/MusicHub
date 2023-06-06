import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import moment from "moment/moment";

const UpdateSongType = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {id} = useParams();
    const [updateSongData, setUpdateSongData] = React.useState([]);

    const navigate = useNavigate();
    const {api, user} = useAppContext();
    const [songOfType, setSongOfType] = React.useState([]);
    React.useEffect(() => {
        api
            .get({url: "/api/song/" + id})
            .then((data) => {
                setUpdateSongData(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        api
            .get({url: "/api/songtype"})
            .then((data) => {
                let getListSongotType = data;
                setSongOfType(Object?.values(data)[2]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // const boodyRequest = (request) => {
    //     api.put({url: "/api/song/"+id, body: request})
    //         .then((res) => {
    //             alert("update song success");
    //             navigate("/admin/song");
    //         })
    // }
    const upload = file => {
        console.debug("[upload]", file)
        return api.upload(file)
            .then((res) => Promise.resolve(res.data))
    }
    const boodyRequest = (formValues) => {
        console.debug("[add-song]", 'form', formValues)
        const audioFile = formValues?.audio[0];
        const imageFile = formValues?.image[0];
        Promise.all([upload(audioFile), upload(imageFile)])
            .then(uploaded => {
                const body = {
                    ...formValues,
                    audio: uploaded[0],
                    image: uploaded[1],
                    accountid: {
                        accountID: user?.accountID
                    },
                    songType: {
                        id: formValues.songType
                    },
                    dateUpload: moment().format("YYYY-MM-DD")
                }
                return api.post({url: "/api/song", body: body})
            })
            .then(res => {
                console.debug("[add-song]", res)
                navigate("/musictracks")
            })
            .catch(err => {
                console.error("[add song]", err);
                // todo: handle error
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
                        </div>
                        {/* /.row */}
                        <div className="container">
                            <div className="row justify-content-around">
                                <form className="col-md-6 bg-light p-3 my-3" onSubmit={handleSubmit(boodyRequest)}>
                                    <h1 className="text-center text-uppercase h3 py-3">
                                        Update Song
                                    </h1>
                                    <div className="form-group">
                                        <label htmlFor="songid">
                                            ID
                                        </label>
                                        <input
                                            type="text"
                                            name="id"
                                            id="songid"
                                            className="form-control"
                                            disabled={true}
                                            defaultValue={id}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Title</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            defaultValue={updateSongData.title}
                                            {...register("title", {
                                                required: "*This is required",
                                                minLength: {value: 2, message: "*Min length is 2"},
                                                maxLength: {value: 20, message: "*Max length is 20"},
                                            })}
                                        />
                                    </div>
                                    <span>{errors.name?.message}</span>
                                    <div className="form-group">
                                        <label htmlFor="songType">Type</label>
                                        <select
                                            name="songType"
                                            id="songType"
                                            className="form-control"
                                            {...register("songType", {
                                                required: "*This is required",
                                            })}
                                        >
                                            <option value="">Select type</option>
                                            {songOfType && songOfType?.map((val, idx) => {
                                                return (
                                                    <option key={idx} value={val.id}>{val.name}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <p>{errors.name?.message}</p>
                                    <div className="form-group">
                                        <label form="audio" className="form-label">Audio</label>
                                        <input
                                            type="file"
                                            name="audio"
                                            id="audio"
                                            className="form-control"
                                            defaultValue={updateSongData.audio}
                                            accept={".mp3,.wav"}
                                            // className="form-control"
                                            {...register("audio", {
                                                required: "*This is required",
                                            })}
                                        />
                                        <span style={{marginTop: "10px"}}>upload before: {updateSongData.audio}</span>
                                    </div>
                                    <p>{errors.audio?.message}</p>
                                    <div className="form-group">
                                        <label htmlFor="image">image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="form-control"
                                            defaultValue={updateSongData.image}
                                            accept={".png,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.webp"}
                                            {...register("image", {
                                                required: "*This is required",
                                            })}
                                            // onChange={handlePreviewImg}
                                        />
                                        <span style={{marginTop: "10px"}}>upload before: {updateSongData.image}</span>
                                    </div>
                                    <p>{errors.image?.message}</p>

                                    <div className="form-group">
                                        <label htmlFor="price">State</label>
                                        <select
                                            name="isPublic"
                                            id="isPublic"
                                            className="form-control"
                                            defaultValue={updateSongData.isPublic}
                                            {...register("isPublic", {
                                                required: "*This is required",
                                            })}
                                        >
                                            <option value="true">public</option>
                                            <option value="false">private</option>
                                        </select>
                                    </div>
                                    <p>{errors.isPublic?.message}</p>
                                    <div className="form-group">
                                        <label htmlFor="price">Price</label>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="form-control"
                                            defaultValue={updateSongData.price}
                                            {...register("price", {
                                                required: "*This is required",
                                            })}
                                        />
                                        <p>{errors.price?.message}</p>
                                    </div>
                                    <div className="form-group hidden">
                                        <input
                                            type="text"
                                            name="dateUpload"
                                            id="dateUpload"
                                            className="form-control"
                                        />
                                        <p>{errors.price?.message}</p>
                                    </div>

                                    {/*{previewImg && (*/}
                                    {/*    <div className="form-group">*/}
                                    {/*        <img src={previewImg.preview} alt="" width={`30%`}/>*/}
                                    {/*    </div>*/}
                                    {/*)*/}
                                    {/*}*/}

                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn-primary btn btn-block"
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
