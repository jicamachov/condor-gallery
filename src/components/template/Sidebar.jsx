import React from "react";
import Menu from "./Menu";

import logo from './../../logo.png';

const Sidebar = props => {
  return (
    <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
      <header className="demo-drawer-header center">
       <img src={logo} alt="Logo" width="100px" height="100px" className="c-img"/>
       Condor Gallery
      </header>
      <Menu />
    </div>
  );
};

export default Sidebar;
