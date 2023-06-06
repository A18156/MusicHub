import React, {useState} from 'react';
import './style.css'
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";
// import DatePicker from "react-datepicker";
import '../../../App.css';
import PropTypes from "prop-types";
import {Button, DatePicker, Form, Input, notification, Select, Space} from "antd";
import dayjs from "dayjs";

const imgUrl = "../../../images/avatar/";


function UpdateForm({isOpen, onClose, initialValues, onFinish, onFinishFailed, update = false}) {
    const {api} = useAppContext();
    const [date, setDate] = useState(new Date());
    const handleChange = (date) => {
        setDate(date);
    };

    return (
        <div className={`update_f ${isOpen ? "visible" : "hidden"}`}
             style={{
                 position: "fixed",
                 zIndex: 100,
                 background: "#fff",
                 borderRadius: "10px",
                 padding:"20px",
                 boxShadow: "0px 0px 8px lightblue",
             }}>
            <Form name="info"
                  labelCol={{ span:  8}}
                  wrapperCol={{ span: 20 }}
                // style={{width: "60%"}}
                  initialValues={{
                      ...initialValues,
                      birthday: initialValues?.birthday ? dayjs(initialValues?.birthday) : undefined
                  }}
                // autoComplete={"off"}
                  layout="horizontal"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
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

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button
                            type="default" danger
                            onClick={() => onClose()}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

UpdateForm.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    initialValues: PropTypes.object,
    onFinish: PropTypes.func,
    onFinishFailed: PropTypes.func,
    update: PropTypes.bool
}

//Account
function Account() {
    const {api, isLogin} = useAppContext();
    const [openUpdate, setOpenUpdate] = useState(false);
    const [infoData, setInfoData] = useState({});

    const initialValues = {
        birthday: dayjs(),
        gender: 1,
        role: "user",
        active: true
    }
    const onFinishFailed = e => {
        console.error("[update account]", e)
        notification.error({
            message: "ERROR", description: "Update failed!",
            placement: "bottomLeft"
        })
    }

    const onFinish = values => {
        console.debug("[update info]", values)
        return api.post({
            url: `/api/auth/updateInfo`, body: {
                ...values,
                birthday: values.birthday.format("YYYY-MM-DD")
            }
        })
            .then(() => {
                notification.success({
                    message: "SUCCESS",
                    description: "Update successful!",
                    placement: "bottomLeft"
                })
                fetchData();
                setOpenUpdate(false);
            })
    }

    function fetchData(){
        api.get({url: "/api/auth/me"})
            .then((data) => {
                // console.table(data);
                setInfoData(data);
                console.log(infoData);

            })
            .catch((err) => {
                console.log(err);
            });
    }
    React.useEffect(() => {
       fetchData();
    }, []);
    const navigate = useNavigate();


    React.useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    const {RangePicker} = DatePicker;

    const dateFormat = 'YYYY-MM-DD';

    return (
        <div className='account-container'>
            <div className='account-content'>
                <div className='avatar'>
                    <img src={`/images/all/${infoData?.avatar}`} alt="avatar"/>
                </div>
                <ul className='user-info'>
                    <li>name: <span>{infoData?.name}</span></li>
                    <li>birthday: <span>{dayjs(infoData.birthday).format("DD/MM/YYYY")}</span></li>
                    <li>email: <span>{infoData?.email}</span></li>
                    <li>phone: <span>{infoData?.phone}</span></li>
                    <li>gender: <span>{infoData?.gender ? "Male" : "Female"}</span></li>
                    <li>
                        <input type="button"
                               value="Change password"
                               className={"btn btn-primary "}
                               onClick={() => navigate("/change-password")}/>
                        <input type="button"
                               value="Update info"
                               onClick={() => setOpenUpdate(true)}
                               className={"btn btn-info"}
                               style={{marginLeft: "20px"}}
                        />
                    </li>
                </ul>
            </div>
            {openUpdate && <UpdateForm
                isOpen={openUpdate}
                onClose={() => {
                    setOpenUpdate(false)
                }}
                initialValues={infoData}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                update={true}
            />}
        </div>
    )
}

export default Account