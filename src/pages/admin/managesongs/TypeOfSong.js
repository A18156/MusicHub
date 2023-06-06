import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";
import {Button, Modal, notification, Table} from "antd";
import dayjs from "dayjs";

const TypeOfSong = () => {
    const navigate = useNavigate();
    const [typeOfSong, setTypeOfSong] = React.useState([]);
    const {api} = useAppContext();
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Type',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Actions",
            width: 150,
            render: (_, record) => {
                return <>
                    <Button
                        type={"primary"}
                        onClick={() => navigate(`/admin/typeofsong/${record.id}`)}
                    >
                        Update
                    </Button>
                    {/* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> */}
                    <Button danger
                            onClick={() => handleDeleteType(record.id)}>
                        Delete
                    </Button>
                </>
            }
        }
    ];

    function fetchData() {
        api
            .get({url: "/api/songtype"})
            .then((data) => {
                setTypeOfSong(data.data);
                // console.log("test",typeOfSong);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteType = (id) => {
        Modal.confirm({
            content: `Delete type [id=${id}]?`,
            onOk: () => api
                .delete({url: `/api/songtype/${id}`})
                .then((data) => {
                    notification.success({message: "SUCCESS", description: `Delete type [id=${id}] successful`})
                    fetchData()
                })
                .catch((err) => {
                    notification.error({message: "ERROR", description: `Delete type [id=${id}] failed`})
                }),
        })
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
                        <Table dataSource={typeOfSong}
                               columns={columns}
                               scroll={{x: true}}
                               pagination={false}
                        />
                    </div>

                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
        </div>
    );
};

export default TypeOfSong;
