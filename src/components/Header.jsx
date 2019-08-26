import React from "react";
import { Link } from "react-router-dom";

import PublishIcon from '@material-ui/icons/Publish';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';


import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    padding: '2px 4px',
    display: 'flex',
    margin: theme.spacing(16),
    alignItems: 'center',
    width: 700
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 16,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">{props.title}</span>

        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <Link to="/search"> <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={props.search}
            />
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />

          </Paper>
          </Link>
        </div>

        <span className="image-upload m-10">
          <Link to="/create-album">
            <AddIcon className={classes.icon} />
            Create
        </Link>
        </span>

        <span className="image-upload">
          <label htmlFor="load-file">
            <PublishIcon className={classes.icon} />
            Load
             </label>
          <input type="file" name="selectedFile" id="load-file" onChange={props.selectedPhoto} />
        </span>
      </div>
    </header>
  );
};

export default Header;
