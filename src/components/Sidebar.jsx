import React from 'react';
import Menu from './Menu';

const Sidebar = (props) => {
    return (
        <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <header className="demo-drawer-header">
                <div className="demo-avatar-dropdown">
                    <span>hello@example.com</span>
                    <div className="mdl-layout-spacer"></div>
                    <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                        <i className="material-icons" role="presentation">arrow_drop_down</i>
                        <span className="visuallyhidden">Accounts</span>
                    </button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
                        <li className="mdl-menu__item">hello@example.com</li>
                        <li className="mdl-menu__item">info@example.com</li>
                        <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
                    </ul>
                </div>
            </header>
            <Menu onChangeTitle={props.onChangeTitle} />
        </div>
    );
}

export default Sidebar;