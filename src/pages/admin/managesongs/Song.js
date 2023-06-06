import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./style.css";
import {useAppContext} from "../../../context/AppContextProvider";
import {Image, Modal, notification, Table, Tag} from 'antd'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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

                console.log("test", song);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    function handleDeleteSong(id) {
        Modal.confirm({
            content: `Delete song [id=${id}]?`,
            onOk: () => api
                .delete({url: `/api/song/${id}`})
                .then((data) => {
                    notification.success({message: "SUCCESS", description: `Delete song [id=${id}] successful`})
                    fetchData()
                })
                .catch((err) => {
                    notification.error({message: "ERROR", description: `Delete song [id=${id}] failed`})
                }),
        })
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
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: url => <Image src={`/files/${url}`} alt={url} width={80}/>
        },
        {
            title: 'Audio',
            dataIndex: 'audio',
            key: 'audio',
            // render: url => <a href={`/files/${url}`}>{url}</a>
            render: url => <audio controls>
                <source src={`/files/${url}`} type="audio/mpeg"/>
            </audio>
        },
        {
            title: 'State',
            dataIndex: 'isPublic',
            key: 'isPublic',
            render: val => <>{val ? <Tag color={"green"}>PUBLIC</Tag> : <Tag color={"red"}>PRIVATE</Tag>}</>
        },
        {
            title: 'Song Type',
            dataIndex: 'songType',
            key: 'songType',
            render: type => <>{type?.name}</>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: "price",
        },
        {
            title: 'Date upload',
            dataIndex: 'dateUpload',
            key: 'dateUpload',
            render: value => <>{dayjs(value).fromNow()}</>
        },
        {
            title: "Actions",
            render: (_, record) => {
                return <>
                    <button
                        className="btn-primary btn"
                        onClick={() => navigate(`/admin/song/${record.id}`)}
                    >
                        Update
                    </button>
                    {/* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> */}
                    <button className="btn btn-outline-danger"
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
                            <button className="btn btn-primary" onClick={() => navigate("addsong")}>
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

                        <Table dataSource={song} columns={columns} pagination={false}/>
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
