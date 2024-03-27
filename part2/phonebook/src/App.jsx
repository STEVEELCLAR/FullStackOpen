import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

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


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

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
    console.log
  
    if (persons.find((person) => person.name === newName )){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
     }
    
    else{
      const nameObject = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      }

      personsService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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
        .remove(`http://localhost:3001/persons/${id}`)
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