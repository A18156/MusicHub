import React, { useState } from "react";
import SlideBar from "../../../components/sliebar/SlideBar";
import "./style.css";

function Signup() {
  const saveDemo = (e) => {};
  return (
    <div>
      <SlideBar />
      <form className="f_signup_container">
        <div className="signup_title">
          <h1>sign up</h1>
        </div>
        <div>
          {/* full name */}
          <div className="f_signup_row">
            <label className="f_signup_text" htmlFor="username">
              full name
            </label>
            <input
              name="username"
              type="text"
              placeholder="enter your full name"

            />
            <p className="f_signup_validation"></p>
          </div>
          {/* birthday */}
          <div className="f_signup_row">
            <label className="f_signup_text" htmlFor="username">
              birthday
            </label>
            <input
              name="username"
              type="text"
              placeholder="enter your email"

            />
            <p className="f_signup_validation"></p>
          </div>
          {/* gender */}
          <div className="f_signup_row">
            <label className="f_signup_text" htmlFor="username">
              gender
            </label>
            <div className="signup_gender">
              <input
                name="username"
                type="radio"
                value="1"

              />
              <label htmlFor="username">male</label>
            </div>
            <div className="signup_gender">
              <input
                name="username"
                type="radio"
                value="0"

              />
              <label htmlFor="username">female</label>
            </div>
          </div>
           {/* email */}
           <div className="f_signup_row">
            <label className="f_signup_text" htmlFor="username">
              birthday
            </label>
            <input
              name="username"
              type="text"
              placeholder="enter your email"

            />
            <p className="f_signup_validation"></p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
