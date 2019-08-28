import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Image from '../shared/image/Image';
import { uid } from 'react-uid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    fontSize: {
        fontSize: '30px'
    },
    fab: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CreateAlbum = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: '',
        photos: []
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values.name);
    };

    const handleCheck = value => event => {
        console.log('---------------');
        console.log(value, event.target.checked);
        if(!event.target.checked) {
            const index = values.photos.findIndex(e => e._id === value._id);
            let data = values.photos
            data.splice(index, 1);
            setValues({ ...values, photos: data });
            console.log(values.photos)
        }else {
            const data = values.photos
            data.push(value);
            setValues({ ...values, photos: data });
            console.log(values.photos)
        }
    }

    const element = props.data.map(record => {

        const item = record.photos.map(photo =>
            <Grid key={photo._id} item xs={3}>
                <Checkbox  onChange={handleCheck({_id: photo._id, path: photo.path, caption: photo.caption, createdt: photo.createdt})}/>
                <Image 
                    open={props.openImage} 
                    remove={props.remove}
                    id={photo._id}  
                    albumid={photo.albumid} 
                    caption={photo.caption} 
                    albumshow={false}
                    path={'http://127.0.0.1:4100/' + photo.path} 
                />
            </Grid>
        );

        return (
            <div key={uid(record)}>
                <h5 className="m-10"> {record.date} </h5>
                <Grid style={{ flexGrow: 1 }} container spacing={1}>
                    {item}
                </Grid>
            </div>
        )
    });

    const add = (values.photos.length > 0 && values.name.length > 0) 
        ? <Fab 
            color="primary" 
            aria-label="add" 
            className={classes.fab} 
            onClick={() => props.addAlbum(values)}
            ><AddIcon/></Fab> 
        : null;

    return (
        <React.Fragment>
            {add}
            <Container maxWidth="sm">
                <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="title-amount" className={classes.fontSize}>Add title</InputLabel>
                    <Input
                        id="album-title"
                        value={values.title}
                        onChange={handleChange('name')}
                        className={classes.fontSize}
                    />
                </FormControl>
            </Container>
            <div>
                {element}
            </div>
        </React.Fragment>
    );
}

export default CreateAlbum;