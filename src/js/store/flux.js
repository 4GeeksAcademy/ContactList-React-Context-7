
const getState = ({ getStore, getActions, setStore }) => {//setStore acutualiza el store
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},

			],

			listContacts: [] ///creamos un espacio donde alamacenaremos lo obtenido de la api asegun los metodos get,...


		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			getInfoContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/Romi/contacts", {
					method: "GET"
				})
					.then((response) => response.json())
					.then((data) => setStore({ listContacts: data.contacts }))//store es un bojeto y yo quiero apuntar al estado contacts y le quiero asignar el valor de data.contacts
					.catch((error => console.log(error)))
			},

			addContactToList: (contact) => {
				const store = getStore();
				setStore({ ...store, listContacts: [...store.listContacts, contact] })
			},

			createContact: (payload) => {
				fetch("https://playground.4geeks.com/contact/agendas/Romi/contacts", {
					method: "POST",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						payload
					),
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						const actions = getActions(); // Obtén el contexto de actions
						actions.addContactToList(data);// Añade el contacto al estado
						console.log("Contacto agregado:", data);
					})
					.catch((error) => console.log(error));
			},
			deleteContact: (id) => {
				fetch(`https://playground.4geeks.com/contact/agendas/Romi/contacts/${id}`, {
					method: "DELETE",
				})
					.then((response) => {
						console.log(response)
						if (response.ok) {
							const store = getStore();
							const updatedContacts = store.listContacts.filter(contact => contact.id !== id);
							setStore({ listContacts: updatedContacts });
							console.log(`Contacto con ID ${id} eliminado`);
						} else {
							console.log("Error al eliminar contacto");
						}
					})
					.catch((error) => console.log(error));
			},

			editContact: (id, contact) => {
				const store = getStore()
				fetch(`https://playground.4geeks.com/contact/agendas/Romi/contacts/${id}`, {
					method: "PUT",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(contact)
				})
					.then((response) => {
						if (response.ok) {
							return response.json()
						}
					})
					.then((data) => {
						if (data) {
							const updatedList = store.listContacts.map(contact => {
								if (contact.id == id) {
									contact = data
								}
								return contact
							})
							setStore({ listContacts: updatedList })
						}
					})
					.catch((error) => console.log(error));


			}
		}
	}
};


export default getState;
