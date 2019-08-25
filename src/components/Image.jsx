import React from "react";

const Image = (props) => {
  return (
    <div
      className="demo-card-image mdl-card mdl-shadow--2dp m-10"
      style={{
        backgroundImage: `url(${props.path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}

      onClick={props.open}
    >
      <div className="mdl-card__title mdl-card--expand"></div>
      <div className="p-top">
      <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
          id={props.id}
        >
          <i className="material-icons">more_vert</i>
        </button>
        <ul
          className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-left"
          htmlFor={props.id}
        >
          <li className="mdl-menu__item"  onClick={props.remove} id={props.id}> 
            Delete
          </li>
          <li className="mdl-menu__item image-upload center">
            <label htmlFor="load-file"> 
              Load
             </label>
            <input type="file" name="selectedFile" id="load-file" />
          </li>
        </ul>
      </div>
      <div className="mdl-card__actions image-bottom" >
        <span className="demo-card-image__filename">{props.caption}</span>
      </div>
    </div>
  );
};

export default Image;
