import React from "react";
import Grid from '@material-ui/core/Grid';

import Image from '../Image';


class Albums extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: []
    }

    this.handleLoadPhotosByAlbum = this.handleLoadPhotosByAlbum.bind(this);
  }

  componentWillMount() {
    const headers = new Headers();
    const header = {
      method: "GET",
      headers,
      mode: "cors",
      cache: "default"
    };
    fetch("http://127.0.0.1:4100/", header)
      .then(res => res.json())
      .then(record => {
        this.setState({album: record.data});
        console.log(record)
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }

  handleLoadPhotosByAlbum(photos) {

  }

  render() {
  const element = this.state.album.map(record => 
      { 
        if(record.photos.length > 0){
          return (<Grid key={record._id} item xs={3}> <Image open={this.handleLoadPhotosByAlbum} caption={`${record.name} (${record.photos.length})`} path={'http://127.0.0.1:4100/' + record.photos[0].path} /> </Grid>) 
        }
        return <Grid key={record._id} item xs={3}>vacia</Grid>
      });

    return (
      <Grid style={{ flexGrow: 1 }} container spacing={1}>
      {element}    
      </Grid>
    );
  }
}

export default Albums;
