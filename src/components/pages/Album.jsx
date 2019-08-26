import React from 'react';
import { uid } from 'react-uid';

import Grid from '@material-ui/core/Grid';

import Image from './../Image';

const Album = (props) => {

    const data = props.data.filter(e => e._id === props.match.params.id);
    const element = data.map(record => {
        const item = record.photos.map(photo =>
            <Grid key={photo._id} item xs={3}>
                <Image
                    open={props.openImage}
                    id={photo._id}
                    albumid={record._id}
                    remove={props.remove}
                    caption={photo.caption}
                    path={'http://127.0.0.1:4100/' + photo.path}
                />
            </Grid>
        );

        return (
            <div key={uid(record)}>
                <h5 className="m-10"> { `Album /  ${record.name}`} </h5>
                <Grid style={{ flexGrow: 1 }} container spacing={1}>
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

export default Album;