import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    //try doing "" vs newName for value of input
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const nameExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  const addName = (event) => {
    event.preventDefault()

    if (nameExists(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} 
                      onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App