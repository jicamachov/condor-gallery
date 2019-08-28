import React from 'react';
import { uid } from 'react-uid';

import Grid from '@material-ui/core/Grid';

import Image from '../shared/image/Image';
import { Container } from '@material-ui/core';

const Album = (props) => {

    const data = props.data.filter(e => e._id === props.match.params.id);
    const element = data.map(record => {
        const item = record.photos.map(photo =>
            <Grid key={photo._id} item >
                <Image
                    open={props.openImage}
                    dataAlbum={props.data}
                    handleClickOpenDialog={props.handleClickOpenDialog}
                    handleAddPhotoToALbum={props.handleAddPhotoToALbum}
                    openDialogAlbum={props.openDialogAlbum}
                    albumshow={true}
                    id={photo._id}
                    photo= {{path: photo.path, caption: photo.caption, createdt: photo.createdt}}
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
                <Grid style={{ flexGrow: 1 }} container>
                    {item}
                </Grid>
            </div>
        )
    });

    return (
        <Container maxWidth="lg">
            {element}
        </Container>
    );
}

export default Album;