import React, {useState} from "react";
import SlideBar from "../../../components/sliebar/SlideBar";
import "./style.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../../context/AppContextProvider";
import {BsFillArrowLeftSquareFill} from "react-icons/bs";



function ChangePwd() {
    const [err, setErr] = useState(false);
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
        api.post({url: "/api/auth/change-password", body: request})
            .then((res) => {
                    navigate("/account");
                }
            ).catch((e) => {
            setErr(true);
            setMessage(e.message);
        })
    };
    return (
        <div>
            <SlideBar/>
            <form className="changePwd_container" onSubmit={handleSubmit(request)}>
                <div className="changePwd_content">
                    <div className="changePwd_title">
                        <h1>Change Password</h1>
                    </div>
                    {/*{err ?   <span className="_err">{message}</span>: ""}*/}
                    <span className={`${err ? "visible": "hidden"}`}>* {message}</span>
                    <div className="changePwd_row">
                        <input
                            type="password"
                            placeholder="Old Password"
                            {...register("oldPassword", {
                                required: "*This is required",
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                                    message: "*Password must contain at least 6 characters, one uppercase, one lowercase, one number and one specical case character"
                                },
                            })}
                        />
                        <span className="_err">{errors.oldPassword?.message}</span>
                    </div>
                    <div className="changePwd_row">
                        <input
                            placeholder="New Password"
                            type="password"
                            {...register("newPassword", {
                                required: "*This is required",
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                                    message: "*Password must contain at least 6 characters, one uppercase, one lowercase, one number and one specical case character"
                                },
                            })}
                        />
                        <span className="_err">{errors.newPassword?.message}</span>
                    </div>
                    <div className="bottom_changePwd">
                        <input type="submit" value="Submit"/>
                        <div className="login_link">
                            <span onClick={() => navigate("/account")}><BsFillArrowLeftSquareFill/></span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ChangePwd;
