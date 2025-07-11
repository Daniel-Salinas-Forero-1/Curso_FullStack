import personsService from './services/persons.js'



const handleUpdate = (persons, id, newNumber, setPersons) => {
  const person = persons.find(p => p.id === id)
  if (!person) return Promise.reject("No existe la persona")

  const updatedPerson = { ...person, number: newNumber }

  return personsService
    .update(id, updatedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(p => (p.id !== id ? p : returnedPerson)))
      return returnedPerson
    })
}

export default { handleUpdate }
