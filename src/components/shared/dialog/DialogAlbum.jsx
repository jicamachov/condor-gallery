import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

 function DialogAlbum(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    album: ''
  });
    let options = null;
    console.log('This is my data', props.dataAlbum);
    if(props.dataAlbum){
        options = props.dataAlbum.map(e => 
            (e.name !== '__other') 
                ? <option key={e._id} value={e._id}>{e.name}</option> 
                :  null
            );
    }

  function handleOnChange(e) {
    console.log(e.target.value)
    setState({...state, album: e.target.value })
    console.log(props.photoid);
  }

  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown open={(props.openDialogAlbum || false)} >
        <DialogTitle>Albums</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Chosse a album</InputLabel>
              <Select
                native
                value={state.album}
                onChange={handleOnChange}
                input={<Input id="age-native-simple" />}
              >
                <option value="" />
                { options }
               
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => props.handleClickOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={() => props.handleAddPhotoToALbum({ albumid: state.album, photo: props.photo})}
            color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogAlbum;