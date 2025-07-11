import { useState, useEffect } from 'react'
import personsService from './services/persons.js'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const AddPerson = (event , persons,newName,newNumber, setNewName,setNewNumber,setPersons,setErrorMessage) => {

    event.preventDefault()

    console.log('button clicked', event.target)

    


    // Verifica si ya existe
    const nameExists = persons.some(person => person.name === newName)

    const newId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) + 1 : 1

    if (nameExists) {
    const confirmUpdate = window.confirm(`¿Quieres modificar el número de ${newName}?`)
    if (confirmUpdate) {

        const personToUpdate = persons.find(p => p.name === newName)
        if (!personToUpdate) {
        alert("No se encontró el contacto para actualizar")
        return
        }
        
        const updatedPerson = { ...personToUpdate, number: newNumber }

    personsService
      .update(personToUpdate.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => (p.id !== personToUpdate.id ? p : returnedPerson)))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`'${personObject.name}' was created in agenda`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log("Error actualizando", error)
      })
    } else {
    return
    }
    }




    const personObject = {
        name : newName,
        number : newNumber,
        id :  String(newId)
    }

    personsService
    .create(personObject)
    .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`'${personObject.name}' was created in agenda`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
    
}

const handleNameChange = (event,setNewName) => {
    setNewName(event.target.value)
}

const handleNumberChange = (event,setNewNumber) => {
    setNewNumber(event.target.value)
}


const Form = ( {persons,setPersons} ) => {

    const [newName, setNewName] = useState('a new name...')

    const [newNumber, setNewNumber] = useState('a new number...')

    const [errorMessage, setErrorMessage] = useState(null)


    return(
        <div>
            <Notification message={errorMessage} />
            <form onSubmit={(e) => AddPerson(e, persons,newName,newNumber, setNewName,setNewNumber,setPersons,setErrorMessage)}>
                <div>
                name: <input 
                    placeholder={newName}
                    onChange={(e) => handleNameChange(e, setNewName)}/>
                </div>
                <div>
                number: <input 
                    placeholder={newNumber}
                    onChange={(e) => handleNumberChange(e, setNewNumber)}/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )

}

export default Form
