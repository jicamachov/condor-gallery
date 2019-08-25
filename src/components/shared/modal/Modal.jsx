import React from 'react';
import './modal.css';

const Modal = (props) => {
    if(!props.img.show) return null;
    return (
        <section id="myModal" className="modal">
            <span onClick={props.close} className="close">&times;</span>
            <img className="modal-content" src={props.img.path} id={props.img.id} alt={props.img.caption} />
            <div id="caption">{props.img.caption}</div>
        </section>
    )
}

export default Modal;