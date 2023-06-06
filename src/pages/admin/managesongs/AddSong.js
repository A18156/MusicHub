import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import "../../../App.css";
import moment from "moment";
import {notification} from "antd";

const AddSong = () => {
    const defaultValues = {
        title: "",
        audio: "",
        dateUpload: "",
        image: "",
        price: "",
        isPublic: "true",
        accountid: {},
        songType: {}
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control, t
    } = useForm({
        defaultValues
    });


    const navigate = useNavigate();
    const {api, user} = useAppContext();
    const [test, setTest] = React.useState();

    const handleValue = (e) => {
        setTest(e.target.value);
        console.log(test);

    }

    const [songOfType, setSongOfType] = React.useState([]);
    let arrayType = [];
    React.useEffect(() => {
        api
            .get({url: "/api/songtype"})
            .then((data) => {
                let getListSongotType = data;
                setSongOfType(data?.data || []);
                const current = new Date();
                const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
                defaultValues.dateUpload = date;
                // console.log(defaultValues.dateUpload);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const upload = file => {
        console.debug("[upload]", file)
        return api.upload(file)
            .then((res) => Promise.resolve(res.data))
    }
    const onAddSong = (formValues) => {
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
                notification.success({
                    message: "SUCCESS",
                    description: "Create song successful!",
                    placement: "bottomLeft"
                })
                navigate("/admin/song");

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
                                <form className="col-md-6 bg-light p-3 my-3" onSubmit={handleSubmit(onAddSong)}>
                                    <h1 className="text-center text-uppercase h3 py-3">
                                        Add Song
                                    </h1>

                                    <div className="form-group">
                                        <label htmlFor="name">Title</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
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
                                            accept={".mp3,.wav"}
                                            // className="form-control"
                                            {...register("audio", {
                                                required: "*This is required",
                                            })}
                                        />
                                    </div>
                                    <p>{errors.audio?.message}</p>
                                    <div className="form-group">
                                        <label htmlFor="image">image</label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="form-control"
                                            accept={".png,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.webp"}
                                            {...register("image", {
                                                required: "*This is required",
                                            })}
                                            // onChange={handlePreviewImg}
                                        />
                                    </div>
                                    <p>{errors.image?.message}</p>

                                    <div className="form-group">
                                        <label htmlFor="price">State</label>
                                        <select
                                            name="isPublic"
                                            id="isPublic"
                                            className="form-control"
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
                                    <input  className="btn-secondary btn btn-block"
                                            type="button"
                                            value="cancel"
                                            onClick={() => navigate("/admin/song")}/>
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
