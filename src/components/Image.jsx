import React from "react";

const Image = (props) => {
  return (
    <div
      className="demo-card-image mdl-card mdl-shadow--2dp m-10 pure-u-1-1"
      style={{
        backgroundImage: `url(${props.path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
    >
      <div className="mdl-card__title mdl-card--expand"></div>
      <div className="mdl-card__actions image-bottom" >
        <span className="demo-card-image__filename">{props.caption}</span>
      </div>
    </div>
  );
};

export default Image;
