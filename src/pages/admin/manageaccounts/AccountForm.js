import React from 'react';
import {Button, Checkbox, DatePicker, Form, Input, Select, Space, Switch} from "antd";
import PropTypes from "prop-types";

const AccountForm = ({initialValues, onFinish, onFinishFailed, onCancel, update = false}) => {
    return (
        <Form name="account"
              labelCol={{span: 8}}
              wrapperCol={{span: 16}}
              style={{width: "60%"}}
              initialValues={initialValues}
            // autoComplete={"off"}
              onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input disabled={update}/>
            </Form.Item>
            {!update && <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>}
            {/*"name": "ntn",*/}
            <Form.Item
                label="Full Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your full name!',
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            {/*"gender": "1",*/}
            <Form.Item
                label="Gender"
                name="gender"
                rules={[
                    {
                        required: true,
                        message: 'Please input your gender!',
                    }
                ]}
            >
                <Select>
                    <Select.Option value={1}>Male</Select.Option>
                    <Select.Option value={0}>Female</Select.Option>
                </Select>
            </Form.Item>
            {/*"birthday": "1998-05-24",*/}
            <Form.Item
                label="Birthday"
                name="birthday"
                rules={[
                    {
                        required: true,
                        message: 'Please input your birthday!',
                    }
                ]}
            >
                <DatePicker
                    format={"YYYY-MM-DD"}
                />
            </Form.Item>
            {/*"phone": "0949249491",*/}
            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone!',
                    },
                    {
                        pattern: /^0\d{9}$/,
                        message: 'Invalid phone!',
                    }
                ]}
            >
                <Input maxLength={10}/>
            </Form.Item>
            {/*"email": "laughingnguyen13@gmail.com",*/}
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                    {
                        pattern: /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/,
                        message: 'Invalid email!',
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            {/*"role":"admin"*/}
            <Form.Item
                label="Role"
                name="role"
                rules={[
                    {
                        required: true,
                        message: 'Please input your role!',
                    }
                ]}
            >
                <Select>
                    <Select.Option value={"admin"}>ADMIN</Select.Option>
                    <Select.Option value={"mod"}>Manager</Select.Option>
                    <Select.Option value={"user"}>User</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name={"active"} label={"Active"} valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item name={"isArtist"} label={"Is Artist"} valuePropName="checked">
                <Switch/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Space>
                    <Button type="default" danger onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

AccountForm.propTypes = {
    initialValues: PropTypes.object,
    onFinish: PropTypes.func,
    onFinishFailed: PropTypes.func,
    onCancel: PropTypes.func,
    update: PropTypes.bool
}
export default AccountForm;