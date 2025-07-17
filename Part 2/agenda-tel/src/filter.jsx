import { useState } from 'react'


const handleFilterChange = (event,setFilter) => {
        console.log(event.target.value)
        setFilter(event.target.value)
    }


const Filter = ( {persons} ) => {

    

    const [filter, setFilter] = useState('')

    
    const filtered = Array.isArray(persons)
    ? persons.filter(person =>
        typeof person.name === 'string' &&
        person.name.toLowerCase().includes(filter.toLowerCase())
        )
  : [];
    

    return(
        <div>
            <input
                placeholder="Buscar..."
                value={filter}
                onChange={(e) => handleFilterChange(e, setFilter)}
            />

            <ul>
                {filtered.map(person => 
                <li key={person.id}>{person.name} {person.number}</li>
                )}
            </ul>
        </div>
    )

}

export default Filter

