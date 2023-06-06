import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Avatar, Button, Checkbox, Image, Modal, notification, Table, Tag} from 'antd'
import {useAppContext} from "../../../context/AppContextProvider";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import "../../../App.css";

dayjs.extend(relativeTime)

const ManageUserAccounts = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const {api, user} = useAppContext();
    const [hidden, setHidden] = React.useState(user?.roles?.length == 0 || user?.roles?.[0].name != "ROLE_ADMIN")
    React.useEffect(() => {
        console.debug("[user]", user)
        setHidden(user?.roles?.length == 0 || user?.roles?.[0] != "ROLE_ADMIN")
    }, [JSON.stringify(user)])

    function fetchData() {
        api
            .get({url: "/api/auth/all-user"})
            .then((data) => {
                setUserData(data?.data || []);
                // console.log("test", userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteAccount(id) {
        Modal.confirm({
            content: `Delete account [id=${id}]?`,
            onOk: () => api
                .delete({url: `/api/auth/delete-account/${id}`})
                .then((data) => {
                    notification.success({message: "SUCCESS", description: `Delete account [id=${id}] successful`})
                    fetchData()
                })
                .catch((err) => {
                    notification.error({message: "ERROR", description: `Delete account [id=${id}] failed`})
                }),
        })
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (src, {name}) => <Avatar src={`/images/avatar/${src}`} shape="square" size={64}>{name}</Avatar>
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: val => <>{val ? <Tag color={"green"}>ACTIVE</Tag> : <Tag color={"red"}>INACTIVE</Tag>}</>
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: (roles) => <>{roles?.[0]?.name}</>
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            render: val => <Checkbox checked={val} readOnly/>
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Mail',
            dataIndex: 'email',
            key: "email",
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: value => value ? "Male" : "Female"
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'Date Register',
            dataIndex: 'dateRegister',
            key: 'dateRegister',
            render: value => <>{dayjs(value).fromNow()}</>
        },
        ...(hidden ? []
            : [{
                title: "Actions",
                fixed: 'right',
                width: 500,
                render: (_, record) => {
                    return <>
                        <Button
                            type={"primary"}
                            onClick={() => navigate(`/admin/manageaccount/edit/${record.accountID}`)}
                        >
                            Update
                        </Button>
                        {/* <input type="submit" value="Update" className="btn-update-admin btn btn-light" /> */}
                        <Button danger
                                onClick={() => handleDeleteAccount(record.accountID)}>
                            Delete
                        </Button>
                    </>
                }
            }])
    ];

    React.useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 title-color">Account</h1>
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="" className="breadcrumb-item">Account</Link>
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
                        {!hidden && (<div style={{marginBottom: 10}}>
                            <button className={`btn btn-primary`}
                                    onClick={() => navigate("addaccount")}>
                                Add Account
                            </button>
                        </div>)}
                        <Table dataSource={userData}
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
    )
}

export default ManageUserAccounts
