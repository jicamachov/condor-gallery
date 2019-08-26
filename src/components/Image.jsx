import React from "react";

import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import DialogAlbum from "./shared/dialog/DialogAlbum";


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const Image = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }


  return (
    <div
      className="demo-card-image mdl-card mdl-shadow--2dp m-10"
      style={{
        backgroundImage: `url(${props.path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }}
    >
      <div className="mdl-card__title mdl-card--expand"></div>
      <div className="p-top p-rigth">
        <MoreVertIcon
          fontSize="large"
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        />
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => props.remove(props.albumid, props.id)}
            data-photoid={props.id}
            data-albumid={props.albumid}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText
              primary="Delete"
            />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemIcon>
              <PhotoAlbumIcon />
            </ListItemIcon>
            <ListItemText
              primary="Album"
              onClick={() => props.handleClickOpenDialog(true)}
            />
            <DialogAlbum 
              photo={props.photo}
              dataAlbum={props.dataAlbum}
              openDialogAlbum={props.openDialogAlbum}
              handleClickOpenDialog= {props.handleClickOpenDialog}
              handleAddPhotoToALbum= {props.handleAddPhotoToALbum}
            />

          </StyledMenuItem>
        </StyledMenu>
      </div>
      <div className="mdl-card__actions image-bottom" >
        <span className="demo-card-image__filename">{props.caption}</span>
        <SettingsOverscanIcon
          className="p-rigth mr-10"
          fontSize="large"
          onClick={ () => props.open({id: props.id, path: props.path, caption: props.caption})}
          id={props.id}
        />
      </div>
    </div>
  );
};

export default Image;
