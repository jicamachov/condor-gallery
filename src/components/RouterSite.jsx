import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Album from "./Album";
import Trash from "./Trash";

const RouterSite = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/album" component={Album} />
      <Route path="/trash" component={Trash} />
    </div>
  );
};

export default RouterSite;
