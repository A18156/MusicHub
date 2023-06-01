import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import News from "./pages/client/new/News";
import Trending from "./pages/client/trending/Trending";
import Account from "./pages/client/account/Account";
import Collection from "./pages/client/collection/Collection";
import Album from "./pages/client/album/Album";
import Category from "./pages/client/category/Category";
import Login from "./pages/client/login/Login";
import Signup from "./pages/client/signup/Signup";
import { AppContextProvider } from "./context/AppContextProvider";
import PrivateRoute from "./context/PrivateRoute";


import AdminApp from "./pages/admin/adminapp/AdminApp";
import AdminHome from "./pages/admin/home/Home";
import AdminMusicTracks from "./pages/admin/managesongs/Song";
import AdminTypeOfSong from "./pages/admin/managesongs/TypeOfSong";
import AdminAlbums from "./pages/admin/managealbum/Albums";
import AdminTypeOfAlbums from "./pages/admin/managealbum/TypeOfAlbum";
import AdminPremium from "./pages/admin/payment/PremiumList";
import SongPurchase from "./pages/admin/payment/SongPurchase";
import ManageAccount from "./pages/admin/manageaccounts/ManageUserAccounts";
import AddSong from "./pages/admin/managesongs/AddSong";
import ForgotPwd from "./pages/client/forgotPwd/ForgotPwd";
import ChangePwd from "./pages/client/changePwd/ChangePwd";


import AddTracks from "./pages/admin/managesongs/AddTrack";
import AddSongTypes from "./pages/admin/managesongs/AddSongType";
import AddAccount from "./pages/admin/manageaccounts/Addaccount";
import AddPremium from "./pages/admin/payment/AddPremium";
import AddAlbumTypes from "./pages/admin/managealbum/AddAlbumType";
import AddAlbum from "./pages/admin/managealbum/AddAlbum";
import UpdateSongType from "./pages/admin/managesongs/UpdateSongType";
import UpdateSong from "./pages/admin/managesongs/UpdateSong";
import UpdateAccount from "./pages/admin/manageaccounts/Updateaccount";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<News />} />
            <Route path="category" element={<Category />} />
            <Route path="trend" element={<Trending />} />
            <Route path="account" element={<Account />} />
            <Route path="collection" element={<Collection />} />
            <Route path="/album/:albumName" element={<Album />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPwd/>} />
          <Route path="change-password" element={<ChangePwd />} />

          <Route
            path="admin"
            element={
              <PrivateRoute>
                <AdminApp />
              </PrivateRoute>
            }
          >
            <Route path="/admin" element={<AdminHome />} />
            <Route path="song" element={<AdminMusicTracks />} />
            <Route path="typeofsong" element={<AdminTypeOfSong />} />
            <Route path="typeofsong/:id" element={<UpdateSongType/>} />
            <Route path="typeofsong/addsongtypes" element={<AddSongTypes />} />
            <Route path="song/addsong" element={<AddSong />} />
            <Route path="song/:id" element={<UpdateSong/>} />
            <Route path="albums" element={<AdminAlbums />} />
            <Route path="typeofalbum" element={<AdminTypeOfAlbums />} />
            <Route path="premium" element={<AdminPremium />} />
            <Route path="songpurchase" element={<SongPurchase />} />
            <Route path="manageaccount" element={<ManageAccount />} />
            <Route path="manageaccount/addaccount" element={<AddAccount />} />
            <Route path="manageaccount/edit/:id" element={<UpdateAccount />} />
            <Route path="addpremium" element={<AddPremium />} />
            <Route path="addalbumtypes" element={<AddAlbumTypes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
