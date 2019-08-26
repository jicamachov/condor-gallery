import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';

function DraggableDialog(props) {
   
    if (!props.showConfirm) return null;
    
    let text = '';
    if (props.option === 'input') {
        text =<Input name="namePhoto" onChange={props.inputChange} />
    } else if(props.option === 'text') {
        text = <DialogContentText> { props.message} </DialogContentText>
    }else if('selected') {
        text = null
    }

    return (
        <div>
            <Dialog
                open={props.showConfirm}
                onClose={props.handleConfimClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {props.title}
        </DialogTitle>
                <DialogContent>
                    {text}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.confimClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={props.confirmAccept} color="primary">
                        {props.nameButtom}
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DraggableDialog;