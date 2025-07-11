import { useState, useEffect } from 'react'
import personsService from './services/persons.js'
import Filter from './filter.jsx'
import Form from './form.jsx'
import All from './all.jsx'




const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter persons={persons} />
      
      <Form persons={persons} setPersons={setPersons} />


      <h2>Numbers</h2>
      <All persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App