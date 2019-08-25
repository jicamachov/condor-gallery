import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../pages/Home";
import Albums from "../pages/Albums";
import Trash from "../pages/Trash";

const configRoutes = [
  {
    key: 1,
    path: '',
    component: Home,
    exact: true,
  },
  {
    key: 2,
    path: '/albums',
    componet: Albums,
    exact: true
  },
  {
    key: 3,
    path: '/trash',
    component: Trash,
    exact: true
  }
]

const Routes = (props) => {
  const data = props.data;
  const remove = props.removePhoto;
  return (
    <div>
      <Route exact path="/" render={(props)=><Home {...props} data={data} remove={remove}/>} />
      <Route path="/albums" component={Albums} />
      <Route path="/trash" component={Trash} />
    </div>
  );
};

export default Routes;
