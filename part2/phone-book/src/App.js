import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import SearchBox from './components/SearchBox'
import AddContact from './components/AddContact'
import Numbers from './components/Numbers'
import {getAll, create, deleteNumber, updateNumber} from './services/ContactService'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [searchField, setSearchField] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getAll()
    .then(initialPersons => setPersons(initialPersons))
      console.log("successful import")
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const found = persons.find(person => person.name === newName)

    if(found && found.number === newPhone) {
      alert('name already exists')
    } 

    else if(found && found.number !== newPhone) {
      const newNumberObject = {
        name: newName,
        number: newPhone
      }

      updateNumber(found.id, newNumberObject)
      .then(newPerson => {
        const newPersons = persons.map(person => person.id !== newPerson.id ? person : newPerson)
        setPersons(newPersons)
        setNewName('')
        setNewPhone('')

        setMessage(`The contact ${newName} has been successfull Updated!`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
    
    else {
      const newNameObject = {
        name: newName,
        number: newPhone
      }

      create(newNameObject)
      .then(newContact => {
        setPersons(persons.concat(newContact))
        setNewName('')
        setNewPhone('')

        setMessage(`The Contact ${newName} has been successfully Added!`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  
      // axios
      //   .post('http://localhost:3001/persons', newNameObject)
      //   .then(response => {
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewPhone('')
      //   })
    }
  }

  const deleteHandler = (id) => {

    const p = persons.find(person => person.id === id)
    
    if(window.confirm(`Are you sure you want to delete ${p.name}`)) {
      deleteNumber(id)
      .then(
        setPersons(persons.filter(person => person.id !== id))
      )
      .catch(error => {
        setMessage('Contact has already been Deleted!')
        setError(true)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const handleSearch = (e) => {
    setSearchField(e.target.value)
  }

  const filteredPersons = 
    persons.filter(person => {
      return person.name.toLowerCase().includes(searchField.toLowerCase())})

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} error={error} />

      <SearchBox 
      searchField={searchField} 
      handleSearch={handleSearch} 
      />
      <AddContact 
      handleSubmit={handleSubmit} 
      newName={newName} 
      handleNewName={handleNewName} 
      newPhone={newPhone} 
      handleNewPhone={handleNewPhone} 
      />
      <Numbers 
      filteredPersons={filteredPersons} deleteHandler={deleteHandler}
      />
    </div>
  )
}

export default App
