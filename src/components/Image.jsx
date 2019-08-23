import React from 'react';

const Image = (props) => {
    return (
        <div class="demo-card-image mdl-card mdl-shadow--2dp" 
            style={{ backgroundImage: `url(${props.path})`,   backgroundSize: 'cover', backgroundPosition: 'center center' }} >
            <div class="mdl-card__title mdl-card--expand"></div>
            <div class="mdl-card__actions">
                <span class="demo-card-image__filename">{ props.caption }</span>
            </div>
        </div>

    );
};

export default Image;