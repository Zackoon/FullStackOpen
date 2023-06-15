import { useState } from 'react'

// refactor into Search, AddNew, People -> Person within that

const Search = ({persons, newSearch,    setNewSearch, searchedPersons, setSearchedPersons}) => {
  
  const handleSearch = (event) => {
    const checkName = (person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }
    setNewSearch(event.target.value)
    setSearchedPersons(persons.filter(checkName))
  }

  return (
    <div>
        filter shown with: <input value={newSearch} onChange={handleSearch}/>
    </div>
  )
}

const AddNew = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // for dealing with input changes in the form
  const handleChange = (setState) => {
    //try doing "" vs newName for value of input
    return (event) => setState(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    // a way to mimic the logic of "includes" but using part of the object rather than the whole object
    const nameExists = (name) => {
      return persons.some((person) => person.name === name)
    }
  
    if (nameExists(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return 
    }
    setPersons(persons.concat({ name: newName,
                            number: newNumber}))
    setNewName('')
    setNewNumber('')
  }

  return (
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
  )
}

const People = ({persons, searchedPersons, newSearch}) => {
  return (
  <div>
    {newSearch == "" 
        ? persons.map(person => <Person person={person} key={person.name}/>) 
        : searchedPersons.map(person => <Person person={person} key={person.name}/>) 
    }
  </div>
  )
}

const Person = ({person}) => <div key={person.name}>{person.name} {person.number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newSearch, setNewSearch] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])

  
  /*
  const handleSearch = (event) => {
    const checkName = (person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }
    setNewSearch(event.target.value)
    setSearchedPersons(persons.filter(checkName))
  }*/


  return (
    <div>
      <h2>Phonebook</h2>
      <Search persons={persons} 
              newSearch={newSearch} 
              setNewSearch={setNewSearch}
              searchedPersons={searchedPersons}
              setSearchedPersons={setSearchedPersons}/> 

      <h2>Add a New Member</h2>
      <AddNew persons={persons} setPersons={setPersons}/>

      <h2>Numbers</h2>
      <People persons={persons} 
              searchedPersons={searchedPersons}
              newSearch={newSearch}/>
    </div>
  )
}

export default App