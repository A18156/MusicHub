import React, {useState} from 'react';
import './style.css'
import avatar from '../../../images/avatar/avatar.png';
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";


const imgUrl = "../../../images/avatar/";

function UpdateForm(data,isOpen) {
    const {api} = useAppContext();
    const [err, setErr] = useState(false);
    const [message, setMessage] = useState("");

    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm(data);

    const infoUpdate = (request)=>{

    }
    return (
        <div className={`update_f ${isOpen? "visible" : "hidden"}`} style={{position: "fixed",zIndex: 100}}>
            <form className="update_container" onSubmit={handleSubmit(infoUpdate)}>
                <div className="f_signup_content">
                    <div className="signup_title">
                        <h1>update</h1>
                    </div>
                    <span className={`${err ? "visible" : "hidden"}`}>{message}</span>
                    <div className="f_signup_row">
                        <input
                            placeholder="your name"
                            defaultValue={data.name}
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
                            rules={{
                                required: "*This field is required"
                            }}
                            render={({field}) => (
                                <>
                                    <DatePicker
                                        onChange={(date) => {
                                            field.onChange(date ? date.valueOf() : null);
                                        }}
                                        // selected={date.birthday}
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
                        <input type="button" value="Cancel" onClick={() => isOpen = false}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

function Account() {
    const {api} = useAppContext();
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
            <UpdateForm data={infoData} open={openUpdate}></UpdateForm>
        </div>
    )
}

export default Account