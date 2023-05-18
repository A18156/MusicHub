import { Outlet } from "react-router-dom";
import React from "react";
import "./App.css";
import Navbar from "./components/navigationbar/Navbar";
import PlayBar from "./components/play-bar/PlayBar";
import SlideBar from "./components/sliebar/SlideBar";


function App() {
  return (
    <div>
      <SlideBar></SlideBar>
      <div className="right">
        <Navbar></Navbar>
        <div className="content-r">
          <Outlet />
        </div>
      </div>
      <PlayBar></PlayBar>
    </div>
  );
}

export default App;
