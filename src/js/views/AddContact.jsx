import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Context } from "../store/appContext.js";


const AddContact = () => {

    const { store, actions } = useContext(Context)

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    function guardarContacto() {
        const payload = {
            name: name,
            phone: phone,
            email: email,
            address: address
        };
        actions.createContact(payload)
        alert("Se grabo los datos del contacto");
        setName("");
        setPhone("");
        setEmail(""),
        setAddress("");
    }



    return (
        <div className="container">
            <h1 className="text-center">Add a New Contact</h1>

            <form className="container">
                <div className="mb-3">
                    <label for="formGroupExampleInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput1" placeholder="Full name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div className="mb-3">
                    <label for="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="mb-3">
                    <label for="formGroupExampleInput3" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="formGroupExampleInput3" placeholder="Enter phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>
                <div className="mb-3">
                    <label for="formGroupExampleInput4" className="form-label">Address</label>
                    <input type="text" className="form-control" id="formGroupExampleInput4" placeholder="Enter address" onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={guardarContacto}>Save</button>
                </div>
            </form>

            <Link to="/"><a>volver a Contacts</a></Link>

        </div>

    );


};
export default AddContact;