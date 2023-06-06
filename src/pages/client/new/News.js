import React, {useState} from "react";
import "./style.css";
import Carousel from "../../../components/carousel/Carousel";
import img1 from "../../../images/album/album1.jpg";
import img2 from "../../../images/album/album2.jpg";
import img3 from "../../../images/album/album3.jpg";
import imgt1 from "../../../images/tracks/track1.jfif";
import imgt2 from "../../../images/tracks/track2.png";
import imgt3 from "../../../images/tracks/track3.jpg";
import {useAppContext} from "../../../context/AppContextProvider";
// import headerImg from "../../../images/Wallpaper-Engine-Steam-App.jpg";

const data = [
    {title: "abc", img: img1, singer: "abc"},
    {title: "abcd", img: imgt1, singer: "abcd"},
    {title: "abcde", img: img1, singer: "abc"},
    {title: "abcdef", img: img1, singer: "abcabc"},
    {title: "ghijk", img: img1, singer: "abc"},
    {title: "abcd abc", img: imgt1, singer: "abcd"},
    {title: "abcef ddd", img: imgt2, singer: "abc"},
    {title: "abcabc ccc", img: imgt3, singer: "abcabc"},
];
const datat = [
    {
        img: imgt1,
    },
    {img: imgt2},
    {img: imgt3},
    {img: imgt3},
    {img: imgt3},
    {img: imgt3},
];
const type = [
    {type: "pop"},
    {type: "r&b"},
    {type: "elctronic"},
    {type: "rock"},
    {type: "country"},
    {type: "trap"},
    {type: "jazz"},
    {type: "hip hop"},
];

function News() {
    const [selectAlbum, setSelectAlbum] = useState(0);

    const [activeTab, setActiveTab] = useState(0);
    const toggleTab = (idx) => {
        setActiveTab(idx);
    };
    const{api} =useAppContext();
    const [getSong,setGetSong] = useState([]);
    React.useEffect(() => {
        api
            .get({url: "/api/song"})
            .then((data) => {
              setGetSong(data.data);
              console.log(data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    return (
        <>
            {/* <div className="header-img">
        <img src={headerImg} alt="bg-img" />
      </div> */}
            <div className="tabs-container">
                <div className="tabs">
                    <div className="products-tab">
                        <ul>
                            <li
                                className={`tab ${activeTab === 0 ? "active-tab" : ""}`}
                                onClick={() => toggleTab(0)}
                            >
                                songs
                            </li>
                            <li
                                className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
                                onClick={() => toggleTab(1)}
                            >
                                albums
                            </li>
                        </ul>
                    </div>
                    <div className="tab-line"></div>
                    <div className="tab-cotent">
                        {/* song content */}
                        <div
                            className={`tab-content ${
                                activeTab === 0 ? "active-tab-content" : ""
                            }`}
                        >
                            <div className="songs">
                                <div className="box-container">
                                    {getSong && getSong?.map((val, idx) => (
                                        <div key={idx} className="new-box">
                                            <img src={`/files/${val.image}`} alt={"img" + idx}/>
                                            <div className="title_column">
                                                <h3>{val.title}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* album content */}
                        <div
                            className={`tab-content ${
                                activeTab === 1 ? "active-tab-content" : ""
                            }`}
                        >
                            <div className="album-tab-content">
                                {data.map((val, idx) => (
                                    <div key={idx} className="album-box">
                                        <div className="album-box-img">
                                            <img className="album_img" src={val.img} alt={"img" + idx}/>
                                        </div>
                                        <div className="album-box-text">
                                            <h3>{val.title}</h3>
                                            <p>{val.singer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default News;
