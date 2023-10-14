const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('post-body', (req, res) => JSON.stringify(req.body))

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

const generateId = () => {
  return Math.floor(Math.random() * (persons.length * 500))
}

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :post-body"))

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(per => per.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/api/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Cannot have empty name or number fields"
    })
  }
  if (persons.some(per => per.name === body.name)) {
    return res.status(400).json({
      error: "Name must be unique"
    })
  }
  const person = {
    id: generateId,
    name: body.name,
    number: body.number
  }
  persons.concat(person)
  res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(per => per.id !== id)
  res.status(214).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Listening on port ${PORT}`);

