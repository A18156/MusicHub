import React, {useState} from 'react'
import Logo from "../../../images/logo.png"
import {Link, useNavigate} from 'react-router-dom'
import {Controller, useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import {Breadcrumb, Button, DatePicker, Form, Input, message, notification, Select, Space} from "antd";
import dayjs from "dayjs";
import AccountForm from "./AccountForm";


const Addaccount = () => {

    const navigate = useNavigate();
    const {api} = useAppContext();

    const initialValues = {
        birthday: dayjs(),
        gender: 1,
        role: "user",
        active: true
    }

    const onFinishFailed = e => {
        console.error("[create account]", e)
        notification.error({
            message: "ERROR", description: "Create account failed!",
            placement: "bottomLeft"
        })
    }

    const onFinish = values => {
        console.debug("[create account]", values)
        return api.post({
            url: "/api/auth/create-account", body: {
                ...values,
                birthday: values.birthday.format("YYYY-MM-DD")
            }
        })
            .then(() => {
                notification.success({
                    message: "SUCCESS",
                    description: "Create account successful!",
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
                                <AccountForm
                                    initialValues={initialValues}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    onCancel={onBack}
                                />
                            </div>

                        </div>
                    </div>
                    {/* /.container-fluid */}

                </div>
            </div>
        </div>
    )
}

export default Addaccount
