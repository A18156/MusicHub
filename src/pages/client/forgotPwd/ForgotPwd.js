import React, {useState} from "react";
import SlideBar from "../../../components/sliebar/SlideBar";
import "./style.css";
import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";
// import dayjs from 'dayjs';
import 'react-datepicker/dist/react-datepicker.min.css';
import {BsFillArrowLeftSquareFill} from "react-icons/bs";

function ForgotPwd() {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();
    const {api} = useAppContext();
    // const [err, setErr] = useState();
    const request = (request) => {
        api.post({url: "/api/auth/forgot-password", body: request})
            .then((res) => {
                    navigate("/login");
                    console.log(res, "mail sent");
                }
            ).catch((err) => {
            console.log("err",err.message);
            setError(true);
            setMessage(err.message);
        })
    };
    return (
        <div>
            <SlideBar/>
            <form className="f_forgotPwd_container" onSubmit={handleSubmit(request)}>
                <div className="f_forgotPwd_content">
                    <div className="forgotPwd_title">
                        <h1>Forgot Password</h1>
                    </div>
                    {/*email*/}
                    <div className="forgotPwd_row">
                        <input
                            placeholder="example@mail.com"
                            {...register("email", {
                                required: "*This is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "*invalid email"
                                }
                            })}
                        />
                        <span className="_err">{errors.email?.message}</span>
                    </div>
                    <div className="f_bottom_forgotPwd">
                        <input type="submit" value="Submit"/>
                        <div className="login_link">
                            <span onClick={() => navigate("/login")}><BsFillArrowLeftSquareFill/></span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ForgotPwd;
