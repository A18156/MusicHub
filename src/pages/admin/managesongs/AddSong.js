import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {useForm, Controller} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import {Multiselect} from 'multiselect-react-dropdown';

const AddSong = () => {
    const defaultValues = {
        defaultValues: {
            name: "",
            audio: "",
            image: "",
            artistname: "",
            songtype: "",
        }
    }
    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        setValue,
        reset
    } = useForm(defaultValues);
    const navigate = useNavigate();
    const {api} = useAppContext();


    var showdate = new Date();
    var today = showdate.toDateString();
    // console.log(today)
    const [songtype, setSongtype] = React.useState([]);
    const [artist, setArtist] = React.useState([]);

    // const [option,setOption] = React.useState([]);
    const tempArtist = [];
    const tempSongType = [];

    const [test, setTest] = React.useState();
    const handleValue = (e) => {
        setTest(e.target.value);
        console.log(test);

    }

    const [previewImg, setPreviewImg] = React.useState();

    useEffect(()=>{
        return()=>{
            previewImg && URL.revokeObjectURL(previewImg.preview);
        }
    },[previewImg])

    const handlePreviewImg = (e) =>{
        const file = e.target.files[0];
        console.log(URL.createObjectURL(file))
        file.preview = URL.createObjectURL(file);
        setPreviewImg(file);
    }
    //get all type of song from data
    api
        .get({url: "/api/songtype"})
        .then((data) => {
            // console.table(data);
            data?.forEach((val) => {
                tempSongType.push({name: val?.name, id: val?.id});
            });
            console.log("type", tempSongType)
            // callback(tempSongType);
        })
        .catch((err) => {
            console.log(err);
        });
    //get all artist from data
    // api.get({url: "/api/artist"})
    //     .then((data) => {
    //         data?.forEach((val) => {
    //             tempArtist.push({name: val?.artistName, id: val?.artistID})
    //         });
    //         console.log("test", tempArtist);
    //         // callback(tempArtist);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
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
                                        <label htmlFor="name">Title</label>
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
                                        <label htmlFor="songtype">Song Type</label>
                                        <Controller
                                            name="songtype"
                                            control={control}
                                            rules={{required: "*This artist is required"}}
                                            render={({
                                                         field,
                                                         fieldState: {error},
                                                         formState,
                                                     }) => (
                                                <Multiselect
                                                    name="artistname"
                                                    options={tempSongType}
                                                    // displayValue="name"
                                                    // selectedValues={songtype.id}
                                                    onChange={(e) => handleValue(e)}
                                                />
                                            )}
                                        />

                                        <p>{errors.songtype?.message}</p>
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
                                            onChange={handlePreviewImg}
                                        />
                                    </div>
                                    {previewImg && (
                                        <div className="form-group">
                                            <img src={previewImg.preview} alt="" width={`30%`}/>
                                        </div>
                                    )
                                    }

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
