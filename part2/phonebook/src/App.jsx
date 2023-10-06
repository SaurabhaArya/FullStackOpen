import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterStr, setfilterStr] = useState('')
  let userExists = false

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(resp => {
        setPersons(resp.data)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (newName && newPhone) {
      userExists = persons.some(person => person.name === newName)
      if (userExists) {
        alert(`${newName} is already added to the phonebook`)
      } else {
        setPersons([...persons, {
          id: persons.length + 1,
          name: newName, 
          number: newPhone
        }])
        setNewName('')
        setNewPhone('')
      }
    }
  }

  const handleSearch = (event) => {
    setfilterStr(event.target.value)
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter 
          str={filterStr} 
          handleSearch={handleSearch} 
        />
      </div>
      <h2>Add a new</h2>
      <PersonForm 
        submit={addPerson} 
        name={newName} 
        phone={newPhone} 
        handleName={handleName} 
        handlePhone={handlePhone} 
      />
      <h2>Numbers</h2>
      <Persons list={persons} str={filterStr} />
    </div>
  )
}

export default App