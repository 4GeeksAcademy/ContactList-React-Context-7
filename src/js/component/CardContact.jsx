import React from "react";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../store/appContext'

const CardContact = ({ contact }) => {
    const { store, actions } = useContext(Context)

    const eliminarContacto = () => {
        actions.deleteContact(contact.id);
    };

    return (
        <li className="list-group-item d-flex justify-content-center">
            <div className="d-flex align-items-center w-75">
                <div className="col-md-3 d-flex justify-content-center">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/150/150/"
                        alt="Contact"
                        style={{ width: "50px", height: "50px" }}
                    />
                </div>
                <div className="col-md-6">
                    <h5 className="card-title mb-1">{contact.name}</h5>
                    <p className="card-text mb-1">{contact.address}</p>
                    <p className="card-text mb-1">{contact.phone}</p>
                    <p className="card-text mb-1">{contact.email}</p>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                    <button className="btn btn-link p-0 me-3">
                        <i className="fa fa-eraser"></i>
                    </button>
                    <button className="btn btn-link p-0" onClick={eliminarContacto}>
                        <i className="fa fa-trash fa-lg"></i>
                    </button>
                </div>
            </div>
        </li>
    )
}
export default CardContact