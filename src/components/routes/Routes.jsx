import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home";
import Albums from "../pages/Albums";
import Trash from "../pages/Trash";
import Search from "../pages/Search";


const Routes = (props) => {
  const data = props.data;
  const remove = props.removePhoto;
  const dataSearch = props.dataSearch;
  const openImage = props.openImage;
  return (
    <div>
      <Route exact path="/" render={(props)=><Home {...props} data={data} remove={remove} openImage={openImage}/>} />
      <Route path="/albums" component={Albums} />
      <Route path="/trash" component={Trash} />
      <Route path="/search" render={(props)=><Search {...props} data={dataSearch} remove={remove}/>} />
    </div>
  );
};

export default Routes;
