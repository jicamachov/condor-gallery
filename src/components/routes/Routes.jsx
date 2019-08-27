import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home";
import Albums from "../pages/Albums";
import Search from "../pages/Search";
import Album from "../pages/Album";
import CreateAlbum from '../pages/CreateAlbum';


const Routes = (props) => {
  const data = props.data;
  const dataSearch = props.dataSearch;
  const dataAlbum = props.dataAlbum;
  const remove = props.removePhoto;
  const openImage = props.openImage;
  const addAlbum = props.addAlbum;
  const openDialogAlbum = props.openDialogAlbum;
  const handleClickOpenDialog = props.handleClickOpenDialog;
  const handleAddPhotoToALbum = props.handleAddPhotoToALbum;

  return (
    <div>
      
      <Route exact path="/" render={(props)=>
        <Home
         {...props} 
         data={data}
         dataAlbum={dataAlbum} 
         remove={remove} 
         openImage={openImage} 
         openDialogAlbum={openDialogAlbum}
         handleClickOpenDialog={handleClickOpenDialog}
         handleAddPhotoToALbum={handleAddPhotoToALbum}
         />
         } />
      
      <Route path="/albums" render={ (props)=>
        <Albums 
          {...props} 
          data={dataAlbum} 
          openImage={openImage} 
        />} />
      
      <Route path="/album/:id" render={ (props)=>
        <Album {...props} 
          data={dataAlbum} 
          remove={remove} 
          openImage={openImage} 
          openDialogAlbum={openDialogAlbum}
          handleClickOpenDialog={handleClickOpenDialog}
          handleAddPhotoToALbum={handleAddPhotoToALbum}
        />} />
      
      <Route path="/create-album" render={ (props)=>
        <CreateAlbum 
          {...props} 
          data={data} 
          openImage={openImage} 
          addAlbum={addAlbum} 
        />
      } />
      <Route path="/search" render={(props)=>
        <Search 
          {...props} 
          data={dataSearch} 
          remove={remove} 
          openImage={openImage} 
          />} 
        />
    </div>
  );
};

export default Routes;
