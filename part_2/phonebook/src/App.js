import { useState, useEffect } from 'react'
import personsService from './service/persons'
import axios from 'axios'
///Bugs to fix
///When name or number fields are blank app crashes


const Filter = ({nameFilter,handleFilterChange }) => {
  return (
    <div>
        Search:
        <input value={nameFilter}
        onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({ addPerson, newName, newNumber, handleNumberChange, handleNameChange}) => {
  return (
<div>
<form onSubmit={addPerson}>
        <div>  
          name: <input value={newName} 
            onChange={handleNameChange}/> </div>
        <div>  
          number: <input value={newNumber} 
            onChange={handleNumberChange}/> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
</div>
  )
}
const Persons = ({personsName, personsNumber, removePersons}) => {
  return (
    <div>
      {personsName} {personsNumber} 
          <button onClick={removePersons}>delete</button>
    </div>
  )
}
  

const Content = ({ persons, removePersons }) => {
  console.log({persons})
 return (
    <div>
     {persons.map(persons =>
        <Persons key={persons.id} 
        personsName={persons.name} 
        personsNumber={persons.number} removePersons={removePersons}/>)}
    </div>
 )
}
const successStyle = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('ERROR')){
    return (
      <div style={errorStyle} className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div style={successStyle} className="error">
        {message}
      </div>
    )
  }
}


const App = () => {

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    console.log('effect')
    personsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (e) => {
    console.log('button clicked', e.target)
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    personsService
    .create(personObject)
    .then(returnedPersons => {
      setPersons(persons.concat(returnedPersons))
      setErrorMessage(`${newName} was successfully added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
      setNewName('')
      setNewNumber('')
      
  }

  const handleFilterChange = (e) => {
    setNameFilter(e.target.value)
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value)
   }
   const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
   }
  
  const handleSubmit = (event) => {
    event.preventDefault()
  }
   //filter in search bar
  const filteredPersons = persons.filter((persons) => {
    return persons.name.toLowerCase().includes(nameFilter.toLowerCase())
  })

  //Check if name already exists, if matched in persons, alert
  const existingPerson = persons.find(
    (persons) => persons.name.toLowerCase() === newName.toLowerCase()
  )
    
    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
        return
      }
      
    const removePersons = ({id}) => {
      if (window.confirm("Do you really want to delete this person?")) {
        personsService
          .remove(id)
          console.log(`${id} successfully deleted`)
        }return (
          (persons) => {
          setPersons(persons.filter((persons) => persons.id !== id))}

      )}

  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={errorMessage} />
    <Filter
    handleFilterChange={handleFilterChange} 
    nameFilter={nameFilter}/>
    <h3>Add a new</h3>
    < PersonForm
    newNumber={newNumber}
    newName={newName}
    addPerson={addPerson}
    handleNameChange={handleNameChange}
    handleNumberChange={handleNumberChange}
    onSubmit={handleSubmit}
    />
    <h2>Names</h2>

    <Content  
    persons={filteredPersons}
    removePersons={removePersons}
   />
    </div>
    )
  }

export default App