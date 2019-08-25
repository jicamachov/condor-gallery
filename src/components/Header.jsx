import React from "react";

import PublishIcon from '@material-ui/icons/Publish';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
  },
  icon: {
    margin: theme.spacing(1),
    fontSize: 16,
  },
}));

const Header = props => {
  const classes = useStyles();
  return (
    <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">{props.title}</span>
        <div className="mdl-layout-spacer"></div>
        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
          <label
            className="mdl-button mdl-js-button mdl-button--icon"
            htmlFor="search"
          >
            <i className="material-icons">search</i>
          </label>
          <div className="mdl-textfield__expandable-holder">
            <input className="mdl-textfield__input" type="text" id="search" />
            <label className="mdl-textfield__label" htmlFor="search">
            </label>
          </div>
        </div>
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
          id="hdrbtn"
        >
          <i className="material-icons">more_vert</i>
        </button>
        <ul
          className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
          htmlFor="hdrbtn"
        >
          <li className="mdl-menu__item">
          <AddIcon className={classes.icon}/>
            Create
          </li>
          <li className="mdl-menu__item image-upload center">
            <label htmlFor="load-file"> 
              <PublishIcon className={classes.icon}/>
              Load
             </label>
            <input type="file" name="selectedFile" id="load-file" onChange={props.selectedPhoto} />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
