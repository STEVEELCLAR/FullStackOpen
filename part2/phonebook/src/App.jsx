import { useState } from 'react'

const DisplayName = ({name, number}) => <p> {name} {number} </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '092304943'
    }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
        number: newNumber
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote} >
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map((person, index) => (
          <div key={index}>
            <DisplayName name={person.name} number = {person.number}/>
          </div>
        ))}
    </div>
    </div>
  )
}

export default App;