import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '999-999-9999'  
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleName = (event) => {
    //try doing "" vs newName for value of input
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    //try doing "" vs newName for value of input
    setNewNumber(event.target.value)
  }

  // a way to mimic the logic of "includes" but using part of the object rather than the whole object
  const nameExists = (name) => {
    return persons.some((person) => person.name === name)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (nameExists(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    setPersons(persons.concat({ name: newName,
                            number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const addPhoneNum = (event) => {
    event.preventDefault()


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
                      onChange={handleName}/>
        </div>
        <div>
          number: <input value={newNumber} 
                      onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App