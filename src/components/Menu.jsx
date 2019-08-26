import React from "react";
import { Link } from "react-router-dom";

const Item = props => {
  return (
    <Link
      className="mdl-navigation__link"
      to={props.link}
      onClick={props.onChangeTitle}
      title={props.title}
    >
      <i
        className="mdl-color-text--blue-grey-400 material-icons"
        role="presentation"
      >
        {props.icon}
      </i>
      {props.title}
    </Link>
  );
};

const Menu = props => {
  return (
    <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      <Item
        link="/"
        title="Photos"
        icon="home"
        onChangeTitle={props.onChangeTitle}
      />
      <Item
        link="/albums"
        title="Album"
        icon="inbox"
        onChangeTitle={props.onChangeTitle}
      />
    </nav>
  );
};

export default Menu;
