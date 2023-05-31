import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SlideBar from "../../../components/sliebar/SlideBar";
import { useAppContext } from "../../../context/AppContextProvider";
import "./style.css";
import "../../../App.css";

function Login() {
  const [loginErr, setLoginErr] = useState(false);
  const [errMessage,setErrMessage] = useState("*Wrong username or password!!");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { signIn, isLogin } = useAppContext();
  React.useEffect(() => {
    if (isLogin) {
      navigate("/");
    }else {
      setLoginErr(true);
    }
  }, [isLogin, navigate]);

  const requestLogin = (data) => {
    signIn(data)
        // LoginService.requestLogin(data)
        .then((res) => {
          // console.log(res.roles[0]);
          // console.log(res.roles.length);
          for(let i = 0; i < res.roles.length; i++){
            if(res.roles[i] === "ROLE_ADMIN" || res.roles[i] === "ROLE_MANAGER"){
              navigate("/admin");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
      <div>
        <SlideBar />
        <form className="f_login_container" onSubmit={handleSubmit(requestLogin)}>
          <div className="f_login_content">
            <div className="login_title">
              <h1>Login</h1>
            </div>
            <span className={`${loginErr ? "visible" : "hidden"}`}>{errMessage}</span>
            <div className="f_login_row">
              <input
                  placeholder="username"
                  {...register("username", {
                    required: "*This is required",
                    minLength: { value: 4, message: "*Min length is 4" },
                    maxLength: { value: 20, message: "*Max length is 20" },
                  })}
              />
              <p className="f_login_validation">{errors.username?.message}</p>
            </div>
            <div className="f_login_row">
              <input
                  type="password"
                  placeholder="password"
                  {...register("password", {
                    required: "*This is required",
                    minLength: { value: 6, message: "*Min length is 6" },
                    maxLength: { value: 20, message: "*Min length is 20" },
                  })}
              />
              <p className="f_login_validation">{errors.password?.message}</p>
            </div>
            <div className="f_bottom_login">
              <div className="forgot_password">
                <span onClick={()=> navigate("/forgot-password")}>forgot password</span>
              </div>
              <input type="submit" value="login" />
              <div className="sign_up_link">
                <span onClick={ ()=> navigate("/signup")}>Sign Up</span>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}

export default Login;
