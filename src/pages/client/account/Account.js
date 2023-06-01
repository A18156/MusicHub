import React, {useState} from 'react';
import './style.css'
import avatar from '../../../images/avatar/avatar.png';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import '../../../App.css';
import PropTypes from "prop-types";


const imgUrl = "../../../images/avatar/";

function UpdateForm({data, isOpen, onClose}) {
    const navigate = useNavigate();
    const {api} = useAppContext();
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState("");
    console.log(data);
    const defaultValues = data
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({defaultValues});

    const infoUpdate = (request)=>{
        api.post({url: "/api/songtype", body: request})
            .then((res) => {alert("add new type of song success");
                navigate("/admin/typeofsong");});
    }
    return (
        <div className={`update_f ${isOpen ? "visible" : "hidden"}`} style={{position: "fixed",zIndex: 100}}>
            <form className="update_container" onSubmit={handleSubmit(infoUpdate)}>
                <div className="f_signup_content">
                    <div className="signup_title">
                        <h1>update</h1>
                    </div>
                    <span className={`${err ? "visible" : "hidden"}`}>{message}</span>
                    <div className="f_signup_row">
                        <input
                            placeholder="your name"
                            defaultValue={defaultValues.name}
                            onChange={e=> e.target.value}
                            {...register("name", {
                                required: "*This is required",
                                minLength: {value: 3, message: "*Min length is 3"},
                                maxLength: {value: 30, message: "*Max length is 30"},
                            })}
                        />
                        <span className="_err">{errors.name?.message}</span>
                    </div>
                    <div className="f_signup_row">
                        <Controller
                            control={control}
                            name="birthday"
                            defaultValue={defaultValues.birthday}
                            rules={{
                                required: "*This field is required"
                            }}
                            render={({field}) => (
                                <>
                                    <DatePicker
                                        placeholderText='Select date'
                                        onChange={(date) => {
                                            field.onChange(date ? date.valueOf() : null);
                                        }}
                                        selected={field.value}
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                    />
                                </>)
                            }
                        />
                        <span className="_err">{errors.birthday?.message}</span>
                    </div>

                    <div className="f_signup_row">
                        <input
                            placeholder="example@mail.com"
                            defaultValue={data.email}
                            {...register("email", {
                                required: "*This is required",
                                pattern: {
                                    value: "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$",
                                    message: "Email must be valid"
                                }
                            })}
                        />
                        <span className="_err">{errors.email?.message}</span>
                    </div>
                    <div className="f_signup_row">
                        <input
                            placeholder="Phone number"
                            defaultValue={data.phone}
                            {...register("phone", {
                                required: "*This is required",
                                minLength: {value: 10, message: "*Min length is 10"},
                                maxLength: {value: 10, message: "*Min length is 10"}
                            })}
                        />
                        <span className="_err">{errors.phone?.message}</span>
                    </div>
                    <div className="f_signup_row">
                        <select className="f_signup_gender"
                            value={data.gender}
                                onChange={e => e.target.value}
                                {...register("gender", {required: "*This is required"})}>
                            <option value="">Select gender</option>
                            <option value="0">female</option>
                            <option value="1">male</option>
                            <option value="2">other</option>
                        </select>
                        <span className="_err">{errors.gender?.message}</span>
                    </div>
                    <div>
                        <input type="submit" value="OK"/>
                        <input type="button" value="Cancel" onClick={() => {
                            console.warn("i am here")
                            onClose();
                        }}/>
                    </div>
                </div>
            </form>
        </div>
    )
}
UpdateForm.propTypes = {
    data: PropTypes.object,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
}
//Account
function Account() {
    const {api, isLogin} = useAppContext();
    const [userName, setUsername] = useState("");
    const [userBirthday, setUserBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");
    const [openUpdate, setOpenUpdate] = useState(false);
    const [infoData, setInfoData] = useState({});

    React.useEffect(() => {
        api.get({url: "/api/auth/me"})
            .then((data) => {
                // console.table(data);
                setInfoData(data);
                setUsername(data?.name);
                let getDate = new Intl.DateTimeFormat('default', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }).format(data?.birthday);
                setUserBirthday(getDate);
                setPhone(data?.phone);
                setEmail(data?.email);
                setAvatar(data?.avatar);
                if (data?.gender === 1) {
                    setGender("Male");
                } else setGender("Female")

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const navigate = useNavigate();


    React.useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    return (
        <div className='account-container' >
            <div className='account-content'>
                <div className='avatar'>
                    <img src={`/images/avatar/${avatar}`} alt="avatar"/>
                </div>
                <ul className='user-info'>
                    <li>name: <span>{userName}</span></li>
                    <li>birthday: <span>{userBirthday}</span></li>
                    <li>email: <span>{email}</span></li>
                    <li>phone: <span>{phone}</span></li>
                    <li>gender: <span>{gender}</span></li>
                    <li>
                        <input type="button" value="change password" onClick={() => navigate("/change-password")}/>
                        <input type="button" value="update info" onClick={() => setOpenUpdate(true)}/>
                    </li>
                </ul>
            </div>
            <UpdateForm data={infoData} isOpen={openUpdate} onClose={() => {
                console.warn("i am there")
                setOpenUpdate(false)
            }}/>
        </div>
    )
}

export default Account