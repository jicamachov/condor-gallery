import React from "react";
import { Grid } from "@material-ui/core";
import Image from "../shared/image/Image";

const Search = (props) => {

  const element = props.data.map(photo =>
    <Grid key={photo._id} item xs={3}>
      <Image 
      id={photo._id}
      open={props.openImage}  
      albumshow={false}
      dataAlbum={props.dataAlbum}
      idAlbum={photo.albumid} 
      remove={props.remove} 
      caption={photo.caption} 
      path={'http://127.0.0.1:4100/' + photo.path} />
      <h6 className="m-10"> {  new Date(photo.createdt).toLocaleDateString() } </h6>
    </Grid>
  );

  return (
    <div >
    <h5 className="m-10"> { `Search/`} </h5>
    <Grid style={{ flexGrow: 1 }} container spacing={1}>
      {element}
    </Grid>
    </div>
    
  );
}

export default Search;
