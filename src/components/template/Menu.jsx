import React from "react";
import { Link } from "react-router-dom";

const Item = props => {
  return (
    <Link
      className="mdl-navigation__link"
      to={props.link}
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
      />
      <Item
        link="/albums"
        title="Albums"
        icon="inbox"
      />
    </nav>
  );
};

export default Menu;
