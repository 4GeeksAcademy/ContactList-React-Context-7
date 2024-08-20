import React, { useState, useEffect, useRef } from "react";

const Contacts = () => {
    const [agendasList, setAgendasList] = useState([])
    const [nameUserAgenda, setNameUserAgenda] = useState("")
    const [contactsList, setContactsList] = useState([]);

    const createNewAgenda = (e) => {
        if (e.key === "Enter") {
            fetch(`https://playground.4geeks.com/contact/agendas/${nameUserAgenda}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "slug": nameUserAgenda,
                    "id": 0
                })
            })
                .then((response) => response.json())

                .then((data) => {

                    if (data.slug) {
                        setAgendasList([...agendasList, data])
                        setNameUserAgenda("")
                    }
                })
                .catch((error) => console.log(error))
        } else {
            return
        }
    }

    const getAllUsersAgendas = () => {
        fetch("https://playground.4geeks.com/contact/agendas")
            .then((response) => response.json())
            .then((data) => {
                setAgendasList(data.agendas)
            })
            .catch((error) => console.log(error))
    }

    const getSingleUserAngenda = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/${nameUserAgenda}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.contacts) {
                    setContactsList(data.contacts);
                } else {
                    console.log("No se encontraron contactos para esta agenda");
                }
            })
            .catch((error) => console.log(error))
    }
    const deleteAgenda = (slug) => {
        console.log(slug);

        fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {

                    let listaFiltrada = agendasList.filter((item) => item.slug !== slug)
                    setAgendasList(listaFiltrada)
                } else {
                    console.log('Error al eliminar la agenda');
                }
            })
            .catch((error) => console.log(error));

    }
    useEffect(() => {
        getAllUsersAgendas()
    }, []);

    return (

        <div>
            <h4>Lista de agendas</h4>
            <input type="text" className="form-control  border-0 fw-light fs-3" placeholder="Crear una agenda" onChange={(e) => setNameUserAgenda(e.target.value)} value={nameUserAgenda} onKeyDown={createNewAgenda} />
            <button className="btn btn-secondary" onClick={getSingleUserAngenda}>Get Agenda {nameUserAgenda}</button>
            <ul>
                {
                    agendasList.map((item) => {
                        return (
                            <div key={item.id} >
                                <li>{item.slug}</li>
                                <button className="btn btn-danger" onClick={() => deleteAgenda(item.slug)}>Delete</button>
                            </div>

                        )
                    })
                }
            </ul>
            <h4>lista de contactos de {nameUserAgenda}</h4>
            <ul>
                {contactsList.length > 0 ? (
                    contactsList.map((contact) => (
                        <div key={contact.id}>
                            <li>{contact.name}</li>
                            <li>{contact.phone}</li>
                            <li>{contact.email}</li>
                            <li>{contact.address}</li>
                        </div>
                    ))
                ) : (
                    <p>No hay contactos en esta agenda.</p>
                )}
            </ul>

        </div>

    );

};
export default Contacts;