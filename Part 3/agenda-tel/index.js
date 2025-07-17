import morgan from 'morgan'
import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors());
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
  try {
    // validación básica: verificar si el arreglo existe y es válido
    if (!Array.isArray(persons)) {
      return response.status(500).json({ error: 'error interno: lista de personas no disponible' })
    }

    // si no hay personas
    if (persons.length === 0) {
      return response.status(404).json({ error: 'no se encontraron personas registradas' })
    }

    // éxito
    response.status(200).json(persons)
  } catch (error) {
    console.error('Error en GET /api/persons:', error.message)
    response.status(500).json({ error: 'ocurrió un error inesperado al recuperar las personas' })
  }
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  const nameExists = persons.some(person => person.name.toLowerCase() === body.name?.toLowerCase());


  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  
  if (nameExists) {
    return response.status(409).json({ 
      error: 'name must be unique' 
    })
  }





  const person = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.get('/info', (request, response) => {
  const numEntries = persons.length
  const date = new Date()

  response.send(
    `<p>Phonebook has info for ${numEntries} people</p>
     <p>${date}</p>`
  )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})