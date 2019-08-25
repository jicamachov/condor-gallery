import React from "react";

import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';

const Image = (props) => {
  return (
    <div
      className="demo-card-image mdl-card mdl-shadow--2dp m-10"
      style={{
        backgroundImage: `url(${props.path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
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
          <li className="mdl-menu__item"  onClick={props.remove} data-photoid={props.id} data-albumid={props.idAlbum}> 
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
        <SettingsOverscanIcon 
          className="p-rigth mr-10" 
          fontSize="large"
          onClick={props.open}
          id={props.id}
          data-imgid={props.id}
          data-imgpath={props.path}
          data-imgcaption={props.caption}
          />
      </div>
    </div>
  );
};

export default Image;
