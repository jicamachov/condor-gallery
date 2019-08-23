import React from "react";

const Header = props => {
  return (
    <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">{props.title}</span>
        <div className="mdl-layout-spacer"></div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <label
            className="mdl-button mdl-js-button mdl-button--icon"
            htmlFor="search"
          >
            <i className="material-icons">search</i>
          </label>
          <div className="mdl-textfield__expandable-holder">
            <input className="mdl-textfield__input" type="text" id="search" />
            <label className="mdl-textfield__label" htmlFor="search">
            </label>
          </div>
        </div>
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
          id="hdrbtn"
        >
          <i className="material-icons">more_vert</i>
        </button>
        <ul
          className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
          htmlFor="hdrbtn"
        >
          <li className="mdl-menu__item">
          <i className="fa fa-plus" aria-hidden="true"></i>Create
          </li>
          <li className="mdl-menu__item image-upload center">
            <label htmlFor="load-file"> <i className="fa fa-upload" aria-hidden="true"></i> Load</label>
            <input type="file" id="load-file" onChange={props.selectedPhoto} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
