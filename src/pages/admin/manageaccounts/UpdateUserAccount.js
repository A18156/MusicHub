import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Logo from "../../../images/logo.png";
import {Controller, useForm} from "react-hook-form";
import {useAppContext} from "../../../context/AppContextProvider";
import moment from "moment/moment";
import DatePicker from "react-datepicker";
import {BsFillArrowLeftSquareFill} from "react-icons/bs";

const UpdateUserAccount = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const request = () =>{

    }
    const [updateUserAccount, setUpdateUserAccount] = React.useState([]);
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
                        </div>
                        {/* /.row */}
                        <div className="container">
                            <div className="row justify-content-around">
                                <form className="f_signup_container" onSubmit={handleSubmit(request)}>
                                    <div className="f_signup_content">
                                        <div className="signup_title">
                                            <h1>Sign Up</h1>
                                        </div>
                                        {/*{err ?   <span className="_err">{message}</span>: ""}*/}
                                        <span className={`${err ? "visible": "hidden"}`}>{message}</span>
                                        {/*name*/}
                                        <div className="f_signup_row">
                                            <input
                                                placeholder="your name"
                                                {...register("name", {
                                                    required: "*This is required",
                                                    minLength: {value: 3, message: "*Min length is 3"},
                                                    maxLength: {value: 30, message: "*Max length is 30"},
                                                })}
                                            />
                                            <span className="_err">{errors.name?.message}</span>
                                        </div>
                                        {/*birthday*/}
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
                                        {/*phone*/}
                                        <div className="f_signup_row">
                                            <input
                                                placeholder="Phone number"
                                                {...register("phone", {
                                                    required: "*This is required",
                                                    minLength: {value: 10, message: "*Min length is 10"},
                                                    maxLength: {value: 10, message: "*Min length is 10"}
                                                })}
                                            />
                                            <span className="_err">{errors.phone?.message}</span>
                                        </div>
                                        {/*email*/}
                                        <div className="f_signup_row">
                                            <input
                                                placeholder="example@mail.com"
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
                                        {/*gender*/}
                                        <div className="f_signup_row">
                                            <select className="f_signup_gender" {...register("gender", {required: "*This is required"})}>
                                                <option value="">Select gender</option>
                                                <option value="0">female</option>
                                                <option value="1">male</option>
                                                <option value="2">other</option>
                                            </select>
                                            <span className="_err">{errors.gender?.message}</span>
                                        </div>
                                        {/*username*/}
                                        <div className="f_signup_row">
                                            <input
                                                className="f_signup_input"
                                                placeholder="username"
                                                {...register("username", {
                                                    required: "*This is required",
                                                    minLength: {value: 4, message: "username at least 4 letter"},
                                                    maxLength: {value: 30, message: "username length not over 30 letter"}
                                                })}
                                            />
                                            <span className="_err">{errors.username?.message}</span>
                                        </div>
                                        {/*password*/}
                                        <div className="f_signup_row">
                                            <input
                                                placeholder="password" type="password"
                                                {...register("password", {
                                                    required: "*This is required",
                                                    pattern: {
                                                        value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                                                        message: "*Password must contain at least 6 characters, one uppercase, one lowercase, one number and one specical case character"
                                                    },
                                                })}
                                            />
                                            <span className="_err">{errors.password?.message}</span>
                                        </div>
                                        <div className="f_bottom_signup">
                                            <input type="submit" value="sign up"/>
                                            <div className="login_link">
                                                <span onClick={() => navigate("/login")}><BsFillArrowLeftSquareFill/></span>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserAccount;
