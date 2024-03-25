import { useState } from 'react'

const DisplayName = ({name}) => <p> {name} </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('');

  const addNote = (event) => {
    event.preventDefault()
    console.log
  

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote} >
        <div>
          name: <input value = {newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map((person, index) => (
          <div key={index}>
            <DisplayName name={person.name} />
          </div>
        ))}
    </div>
    </div>
  )
}

export default App;