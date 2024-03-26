import { useState } from 'react'

const Persons = ({name, number}) => <div> {name} {number} </div>

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

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
        id: persons.length +1,
      }
    
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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
            <Persons name={person.name} number = {person.number}/>
          </div>
        ))}
    </div>
    </div>
  )
}

export default App;