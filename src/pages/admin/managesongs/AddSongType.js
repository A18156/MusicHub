import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import {Button, Form, Input, notification, Space} from "antd";

const AddSongType = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const navigate = useNavigate();
    const {api} = useAppContext();
    const boodyRequest = (request) =>{
        api.post({url: "/api/songtype", body: request})
            .then((res) => {alert("add new type of song success");
            navigate("/admin/typeofsong");})
    }


    const onFinishFailed = e => {
        console.error("[create account]", e)
        notification.error({
            message: "ERROR", description: "Create type failed!",
            placement: "bottomLeft"
        })
    }

    const onFinish = values => {
        console.debug("[create account]", values)
        return  api.post({url: "/api/songtype", body: values})
            .then(() => {
                notification.success({
                    message: "SUCCESS",
                    description: "Create type successful!",
                    placement: "bottomLeft"
                })
                onBack()
            })
    }
    const initialValues ={
        name: ""
    }

    const onBack = () => {
        navigate("/admin/typeofsong")
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
                                        Type Of Song
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
                                {/*<form className="col-md-6 bg-light p-3 my-3" onSubmit={handleSubmit(boodyRequest)}>*/}
                                {/*    <h1 className="text-center text-uppercase h3 py-3">*/}
                                {/*        Add Song&apos;s Type*/}
                                {/*    </h1>*/}
                                {/*    <div className="form-group">*/}
                                {/*        <label htmlFor="songtype">Song Type</label>*/}
                                {/*        <input*/}
                                {/*            type="text"*/}
                                {/*            name="songtype"*/}
                                {/*            id="songtype"*/}
                                {/*            className="form-control"*/}
                                {/*            {...register("name", {*/}
                                {/*                required: "*This is required",*/}
                                {/*                minLength: {value: 2, message: "*Min length is 2"},*/}
                                {/*                maxLength: {value: 20, message: "*Max length is 20"},*/}
                                {/*            })}*/}
                                {/*        />*/}
                                {/*        <p>{errors.name?.message}</p>*/}
                                {/*    </div>*/}

                                {/*    <input*/}
                                {/*        type="submit"*/}
                                {/*        value="Submit"*/}
                                {/*        className="btn-primary btn btn-block"*/}
                                {/*    />*/}
                                {/*</form>*/}
                                <Form
                                    name="account"
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 16}}
                                    style={{width: "60%"}}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    initialValues={initialValues}
                                >
                                    <Form.Item
                                        label="Type Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Space>
                                            <Button type="default" danger onClick={onBack}>
                                                Cancel
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                    {/* /.container-fluid */}
                </div>
            </div>
        </div>
    );
};

export default AddSongType;
