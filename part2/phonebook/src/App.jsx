import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import service from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterStr, setfilterStr] = useState('')

  const hook = () => {
      service.getPersons()
      .then(resp => {
        setPersons(resp)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName, 
      number: newPhone
    }
    if (newName && newPhone) {
      const personExists = persons.find(per => per.name.toLowerCase() === newName.toLowerCase())
      if (
        personExists && 
        window.confirm(`${newName} is already added to phone book, replace the old number with a new one?`)
      ) {
        service.updatePerson(personExists.id, person)
          .then(resp => {
            setPersons(persons.map(per => per.id === resp.id ? resp : per))
          })
      } else if (!personExists) {
        service.addPerson(person)
        .then(resp => {
          setPersons([...persons, resp])
        })        
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

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service.deletePerson(person.id)
        .then(resp => {
          setPersons(persons.filter(per => per.id !== person.id))
        })
    }
  }

  const filteredList = persons.filter(person => person.name.toLowerCase().includes(filterStr.toLowerCase()))

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
      <div>
        {filteredList.map(person => (
          <Persons key={person.id} person={person} handleDelete={() => handleDelete(person)} />
        ))}
      </div>
    </div>
  )
}

export default App