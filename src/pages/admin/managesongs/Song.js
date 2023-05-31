import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./style.css";
import {useAppContext} from "../../../context/AppContextProvider";
import {Table} from 'antd'

const Song = () => {
    const navigate = useNavigate();
    const {api} = useAppContext();
    const [song, setSong] = useState([]);
    let getDate;

    function fetchData() {
        api
            .get({url: "/api/song"})
            .then((data) => {
                setSong(data?.data || []);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    function handleDeleteSong(id) {
        if (window.confirm("are you sure")) {
            api.delete({url: "/api/song/" + id}).then(() => {
                fetchData()
            })
                .catch(e => {
                    alert("Cannot delete song!")
                });
        }
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Audio',
            dataIndex: 'audio',
            key: 'audio',
        },
        {
            title: "Actions",
            render: (_, record) => {
                return <>
                    <button
                        className="btn-update-admin btn btn-light"
                        onClick={() => navigate(`/admin/typeofsong/${record.id}`)}
                    >
                        Update
                    </button>
                    {/* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> */}
                    <button className="btn-delete-admin btn btn-light"
                            onClick={() => handleDeleteSong(record.id)}>
                        Delete
                    </button>
                </>
            }
        }
    ];


    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 title-color">Songs</h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="" className="breadcrumb-item">Songs</Link>
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
                            <button className="btn btn-primary" onClick={() => navigate("/admin/song/addsong")}>
                                Add Song
                            </button>
                        </div>
                        {/* <br /> */}
                        {/*<table className="tbl-full table table-striped ">*/}
                        {/*    <thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>No.</th>*/}
                        {/*        <th>Title</th>*/}
                        {/*        <th>Image</th>*/}
                        {/*        <th>Audio</th>*/}
                        {/*        <th>Date Upload</th>*/}
                        {/*        <th>Price</th>*/}
                        {/*        <th>Public</th>*/}
                        {/*        <th></th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*    {song.map((val, idx) => {*/}
                        {/*        return (*/}
                        {/*            <tr key={idx}>*/}
                        {/*                <td>{val.id}</td>*/}
                        {/*                <td>{val.title}</td>*/}
                        {/*                <td>{val.image}</td>*/}
                        {/*                <td>{val.audio}</td>*/}
                        {/*                <td>{*/}
                        {/*                    new Intl.DateTimeFormat('default', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(val.dateUpload)*/}
                        {/*                   }</td>*/}
                        {/*                <td>{val.price}</td>*/}
                        {/*                <td>{val.isPublic}</td>*/}
                        {/*                <td>100.000</td>*/}
                        {/*                <td>*/}
                        {/*                    <button*/}
                        {/*                        className="btn-update-admin btn btn-light"*/}
                        {/*                        onClick={() => navigate(`/admin/typeofsong/${val.id}`)}*/}
                        {/*                    >*/}
                        {/*                        Update*/}
                        {/*                    </button>*/}
                        {/*                    /!* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> *!/*/}
                        {/*                    <button className="btn-delete-admin btn btn-light"*/}
                        {/*                            onClick={() => handleDeleteSong(val.id)}>*/}
                        {/*                        Delete*/}
                        {/*                    </button>*/}
                        {/*                </td>*/}
                        {/*            </tr>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}

                        <Table dataSource={song} columns={columns}/>
                        {/* /.row (main row) */}
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>
    )
}

export default Song
