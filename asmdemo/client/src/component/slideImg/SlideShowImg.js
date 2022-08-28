import React from "react";
import './slideshow.css'
import { Zoom } from "react-slideshow-image";
import image1 from "./images/slide_1.jpg";
import image2 from "./images/slide_2.jpg";
import image3 from "./images/slide_3.jpg";
import image4 from "./images/slide_4.jpg";
import image5 from "./images/slide_5.jpg";
// style was imported in index.css
// import "react-slideshow-image/dist/styles.css";
const images = [image1, image2, image3, image4, image5];

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true
};

const Slideshow = () => {
  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <img key={index} style={{ width: "100%" }} src={each} />
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;