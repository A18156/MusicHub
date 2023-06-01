import React, {useState} from 'react'
import Logo from "../../../images/logo.png"
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Controller, useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import {Breadcrumb, Button, DatePicker, Form, Input, message, notification, Select, Space} from "antd";
import dayjs from "dayjs";
import AccountForm from "./AccountForm";


const UpdateAccount = ({}) => {
    const navigate = useNavigate();
    const {api} = useAppContext();
    const {id} = useParams()

    const [account, setAccount] = React.useState()
    React.useEffect(() => {
        const onError = e => {
            console.error("[UpdateAccount]", "useEffect", e)
            notification.error({message: "ERROR", description: `Not found account [id=${id}]`})
            onBack()
        }
        try {
            api.get({url: `/api/auth/get-by-id/${parseInt(id)}`})
                .then(data => {
                    setAccount({...data, birthday: dayjs(data.birthday, "YYYY-MM-DD")})
                })
                .catch(e => {
                    onError(e)
                })
        } catch (e) {
            onError(e)
        }
    }, [id])

    const onFinishFailed = e => {
        console.error("[update account]", e)
        notification.error({
            message: "ERROR", description: "Update account failed!",
            placement: "bottomLeft"
        })
    }

    const onFinish = values => {
        console.debug("[update account]", values)
        return api.put({
            url: `/api/auth/update-account/${account?.id}`, body: {
                ...values,
                birthday: values.birthday.format("YYYY-MM-DD")
            }
        })
            .then(() => {
                notification.success({
                    message: "SUCCESS",
                    description: "Update account successful!",
                    placement: "bottomLeft"
                })
                onBack()
            })
    }

    const onBack = () => {
        navigate("/admin/manageaccount")
    }

    return (
        <div>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4">
                                <h1 className="m-0 title-color">Create Account</h1>
                            </div>
                            <div className="col-sm-8">
                                <ol className="breadcrumb float-sm-right">
                                    <Link to="/admin/manageaccount" className="breadcrumb-item">Account</Link>
                                    <li className="breadcrumb-item active">Home</li>
                                </ol>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                        <div className="container">
                            <div className="row justify-content-around">
                                {account && <AccountForm
                                    update={true}
                                    initialValues={account}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    onCancel={onBack}
                                />}
                            </div>

                        </div>
                    </div>
                    {/* /.container-fluid */}

                </div>
            </div>
        </div>
    )
}

export default UpdateAccount
