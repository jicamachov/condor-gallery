import React from 'react';
import Image from './../Image';

import Grid from '@material-ui/core/Grid';


const Home = (props) => {

    console.log('data home', props.data);
    const element = props.data.map(record => {

        const item = record.photos.map(photo =>
            <Grid key={photo._id} item xs={3}>
                <Image id={photo._id} remove={props.remove} caption={photo.caption} path={'http://127.0.0.1:4100/' + photo.path}  />
            </Grid>
        );

        return (
            <div>
                
            <h5 className="m-10"> {record.date} </h5>
            <Grid key={record.date} style={{ flexGrow: 1 }} container spacing={1}>
                {item}
            </Grid>
            </div>
        )
    });
    return (
        <div>
            {element}
        </div>
    );
}

export default Home;