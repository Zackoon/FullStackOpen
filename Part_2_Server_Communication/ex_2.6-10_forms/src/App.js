import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])

  const handleChange = (setState) => {
    //try doing "" vs newName for value of input
    return (event) => setState(event.target.value)
  }

  const handleSearch = (event) => {
    const checkName = (person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }
    setNewSearch(event.target.value)
    setSearchedPersons(persons.filter(checkName))
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
      <div>
        filter shown with: <input value={newSearch} onChange={handleSearch}/>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
                      onChange={handleChange(setNewName)}/>
        </div>
        <div>
          number: <input value={newNumber} 
                      onChange={handleChange(setNewNumber)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newSearch == "" 
        ? 
        persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>) 
        : 
        searchedPersons.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>)
       }
      
    </div>
  )
}

export default App