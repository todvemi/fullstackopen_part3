const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {id: 1, name: "Arto Hellas", number: "040-123456"},
    {id: 2, name: "Ada Lovelace", number: "39-44-5323523"},
    {id: 3, name: "Dan Abramov", number: "12-43-234345"},
    {id: 4, name: "Mary Poppendick", number: "39-23-6423122"}
]

app.get('/', (req, res) => {
    res.send('<h1>Hello..</h1>')
})

app.get('/info', (req, res) => {
    let time = Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${time.toString()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(note => note.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 9999)
}

app.post('/api/persons', (req, res) => {
    const names = persons.map(person => person.name.toLowerCase())
    const body = req.body
    
    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    } else if (names.includes(body.name.toLowerCase())) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})