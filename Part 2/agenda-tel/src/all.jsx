import personsService from './services/persons.js'


const Name = ({ name,onDelete  }) => {

    return (
        <li>
            {name.name} {name.number}
            <button onClick={onDelete}>Eliminar</button>
        </li>
    )
}


const All = ( {persons,setPersons} ) => {

    const handleDelete = (id) => {
        
        if (window.confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
            personsService
            .remove(id)
            .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
            .catch(error => {
                console.log("Error eliminando", error)
            })
        }
    }
    
    return(
        <div>
           <ul>
                {persons.map(name => 
                    <Name key={name.id} name={name} onDelete={() => handleDelete(name.id)} />
                )}
            </ul>
        </div>
    )

}

export default All



