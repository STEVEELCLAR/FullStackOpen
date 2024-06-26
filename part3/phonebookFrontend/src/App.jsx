import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const Persons = ({name, number, remove}) => {
  return(
    <div> 
      {name} {number} 
      <button onClick={remove}>delete</button>
    </div>
  )
}

const Filter = ({searchName, eventHandler}) => <div>filter shown with <input value = {searchName} onChange={eventHandler}/></div>

const PersonForm = ({addNote, newName, eventNameHandler, newNumber, eventNumberHandler}) => {
  return (
    <form onSubmit={addNote} >
        <div>
          name: <input value = {newName} onChange={eventNameHandler}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={eventNumberHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({ message, design }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={design}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [notifMessage, setNotifMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    
    const nameObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`,
    }
    
    const person = persons.find((person) => person.name === newName)
    
    if(person)
     {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new`)){
        personsService
          .update(person.id, nameObject).then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotifMessage(`Updated ${person.name} number`)
            setErrorMessage('')
          })
          .catch(error => {
            setNotifMessage('')
            setErrorMessage(`Information of '${person.name}' has already been removed from server`)
          })
       }
       else{
        setNewName('')
        setNewNumber('')
        setNotifMessage('')
       }
     }
    
    else{

      personsService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setErrorMessage('')
          setNotifMessage(`Added ${newName}`)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotifMessage('')
          setErrorMessage(`Error${error.response.data.error}`)
        })
      setNewName('')
      setNewNumber('')
      setErrorMessage('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const remove = id => {
    const person = persons.find((person) => person.id === id)
    if(window.confirm(`Delete ${person.name}`)){
      personsService
        .remove(`${id}`)
        .then(() => {
          return personsService.getAll()
        })
        .then(updatedResponse => {
          setPersons(updatedResponse.data)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notifMessage && <Notification message={notifMessage} design = "notif"/>}
      {errorMessage && <Notification message = {errorMessage} design = "error" />}
      <Filter searchName = {searchName} eventHandler = {handleSearchNameChange} /> 
      <h2>add a new</h2>
      <PersonForm 
          addNote = {addNote} newName = {newName} eventNameHandler = {handleNameChange}
          newNumber = {newNumber} eventNumberHandler = {handleNumberChange}
      />     
      <h2>Numbers</h2>
      <div>
      {filteredPersons.map((person, index) => (
          <div key={index}>
            <Persons 
              name={person.name} 
              number = {person.number}
              remove = {()=> remove(person.id)}
            />
          </div>
        ))}
    </div>
    </div>
  )
}

export default App;