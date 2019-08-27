import React from "react";
import { Grid } from "@material-ui/core";
import Image from "../shared/image/Image";

const Search = (props) => {

  const element = props.data.map(photo =>
    <Grid key={photo._id} item xs={3}>
      <Image id={photo._id}  open={props.openImage}  idAlbum={photo.albumid} remove={props.remove} caption={photo.caption} path={'http://127.0.0.1:4100/' + photo.path} />
    </Grid>
  );

  return (
    <Grid style={{ flexGrow: 1 }} container spacing={1}>
      {element}
    </Grid>
  );
}

export default Search;
