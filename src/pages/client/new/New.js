import React, { useState } from "react";
import "./style.css";
import Carousel from "../../../components/carousel/Carousel";
import img2 from "../../../images/album/album2.jpg";
import img3 from "../../../images/album/album3.jpg";
import imgt1 from "../../../images/tracks/track1.jfif";
import imgt2 from "../../../images/tracks/track2.png";
import imgt3 from "../../../images/tracks/track3.jpg";

const data = [
  {
    img: img3,
  },
  { img: img2 },
  { img: img3 },
  { img: img2 },
];
const datat = [
  {
    img: imgt1,
  },
  { img: imgt2 },
  { img: imgt3 },
];
const type = [
  { type: "pop" },
  { type: "r&b" },
  { type: "elctronic" },
  { type: "rock" },
  { type: "country" },
  { type: "trap" },
  { type: "jazz" },
  { type: "hip hop" },
];
function New() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectType, setSelectType] = useState(0);
  const newSlider = {
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slideToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setSlideIndex(next),
  };
  const category = {
    slidesToShow: 7,
    slideToScroll: 1,
    speed: 500,
    focusOnSelect: true,
    centerPadding: "0px",
    centerMode: true,
    afterChange: (current) => setSelectType(current),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },{
        breakpoint:768,
        settings: {
          slidesToShow: 3,
        },
      }
    ],
  };
  return (
    <>
      <div className="newslider">
        <Carousel set={newSlider}>
          {data.map((val, idx) => (
            // eslint-disable-next-line
            <div
              key={idx}
              className={`newSlide ${idx === slideIndex ? "newSlide-active" : ""}`}
            >
              <img className="img" src={val.img} alt={"img" + idx} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="category">
        <Carousel set={category}>
          {type.map((val, idx) => (
            <div key={idx}>
              <div
                className={`category-text  ${
                  idx === selectType ? "category-active " : ""
                }`}
              >
                {val.type}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="songs">
        <div className="box-container">
          {datat.map((val, idx) => (
            <div key={idx} className="new-box">
              <img src={val.img} alt={"img" + idx} />
              <div className="column">
                <h3>track 1</h3>
                <p>singer</p>
              </div>
            </div>
          ))}
          {datat.map((val, idx) => (
            <div key={idx} className="new-box">
              <img src={val.img} alt={"img" + idx} />
              <div className="column">
                <h3>track 1</h3>
                <p>singer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default New;
