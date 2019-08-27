import React from "react";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';


import Image from '../shared/image/Image';
import { Container } from "@material-ui/core";


const Albums = (props) => {

  console.log(props.data);

  const element = props.data.map(record => {
    if (record.photos.length > 0) {
      return (
        <Grid key={record._id} item >
          <Link to={`/album/${record._id}`}>
            <Image
              caption={`${record.name} (${record.photos.length})`}
              path={'http://127.0.0.1:4100/' + record.photos[0].path}
            />
          </Link>
        </Grid>)
    }
    return null;
  });

  return (
    <Container maxWidth="lg">
       <h5 className="m-10"> { `Albums/`} </h5>
      <Grid style={{ flexGrow: 1 }} container >
        {element}
      </Grid>
    </Container>
  );
}

export default Albums;
