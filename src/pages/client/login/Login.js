import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SlideBar from "../../../components/sliebar/SlideBar";
import { useAppContext } from "../../../context/AppContextProvider";
import "./style.css";

function Login() {
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
    }
  }, [isLogin, navigate]);

  const requestLogin = (data) => {
    signIn(data)
      // LoginService.requestLogin(data)
      .then((res) => {
        console.log(res);
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
          <div className="f_login_row">
            <label className="f_login_text" htmlFor="username">
              username
            </label>
            <input
              placeholder="enter your email"
              {...register("username", {
                required: "*This is required",
                minLength: { value: 4, message: "*Min length is 4" },
                maxLength: { value: 20, message: "*Min length is 20" },
              })}
            />
            <p className="f_login_validation">{errors.username?.message}</p>
          </div>
          <div className="f_login_row">
            <label name="password" className="f_login_text" htmlFor="">
              password
            </label>
            <input
              type="password"
              placeholder="enter your password"
              {...register("password", {
                required: "*This is required",
                minLength: { value: 6, message: "*Min length is 6" },
                maxLength: { value: 20, message: "*Min length is 20" },
              })}
            />
            <p className="f_login_validation">{errors.password?.message}</p>
          </div>
          <div className="f_bottom_login">
            <input type="submit" value="login" />
            <div className="sign_up_link">
              <Link to="signup">
                <span>sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
