import React, { useState, useEffect, useRef } from "react";

const Contacts = () => {
    const [agendasList, setAgendasList] = useState([])
    const [name, setName] = useState("")


    const createNewAgenda = (e) => {
        if (e.key === "Enter") {
            fetch(`https://playground.4geeks.com/contact/agendas/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "slug": name,
                    "id": 0
                })
            })
                .then((response) => response.json())

                .then((data) => {

                    if (data.slug) {
                        setAgendasList([...agendasList, data])
                        setName("")
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
        fetch(`https://playground.4geeks.com/contact/agendas/${name}`)
            .then((response) => response.json())
            .then((data) => {
                setAgendasList(data.agendas)
            })
            .catch((error) => console.log(error))
    }


    useEffect(() => {
        getAllUsersAgendas()
    }, []);

    return (

        <div>
            <h4>Lista de agendas</h4>
            <input type="text" className="form-control  border-0 fw-light fs-3" placeholder="Crear o buscar una agenda" onChange={(e) => setName(e.target.value)} value={name} onKeyDown={createNewAgenda} />
            <button className="btn btn-secondary" onClick={getSingleUserAngenda}>Conseguir Lista de {name}</button>
            <ul>
                {
                    agendasList.map((item) => {
                        return (
                            <div key={item.id} >
                                <li>{item.slug}</li>
                            </div>

                        )
                    })
                }
            </ul>







        </div>

    );



};
export default Contacts;