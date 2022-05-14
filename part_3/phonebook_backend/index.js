const express = require('express')
const app = express()
const morgan =require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

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


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  //return list of all persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
  })
//return count of persons & Date/time
app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const maxId = persons.map(persons => persons.id)
        response.send(
            `
            <div>
                 <p>The phonebook has info for ${maxId.length} people</p>
            </div>
            <div>
                <p>${currentDate} (${timeZone})</p>
            </div>`)
        })
//get individual persons by ID
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(persons => persons.id === id)
    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
    }
    })
   
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)
    response.status(204).end()
      })

const generateId = () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(persons => persons.id))
    : 0
    return maxId + 1
}
app.post('/api/persons/', (request, response) => {
    
    const body = request.body
    console.log(body)
    const existingPerson = persons.find(
        (persons) => persons.name.toLowerCase() === body.name.toLowerCase()
      )

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name is missing' })
      }

    else if (!body.number) {
        return response.status(400).json({ 
          error: 'number is missing' })
      }
    else if (existingPerson && existingPerson.number === body.number) {
        return response.status(400).json({ 
          error: 'phonebook entries must be unique. This name/number pair exists already.' })
      }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }
    console.log(person)
    persons = persons.concat(person)
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

