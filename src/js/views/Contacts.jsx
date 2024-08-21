import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../store/appContext.js";
import CardContact from "../component/CardContact.jsx";

const Contacts = () => {

    const { store, actions } = useContext(Context)
    console.log(store.listContacts)

    useEffect(() => {
        actions.getInfoContacts()
    }, [])

    return (

        <div className="w-75 mx-auto">
            <div className="d-flex justify-content-end">
                <Link to="/AddContact">
                    <button className="btn btn-success">Add New contact</button>
                </Link>
            </div>
            <ul className="list-group mt-3">
                {store.listContacts.map((contact, index) => <CardContact contact={contact} key={contact.id} />)}
            </ul>
        </div>
    );
};
export default Contacts;