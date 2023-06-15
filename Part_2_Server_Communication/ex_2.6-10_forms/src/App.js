import axios from 'axios'
import { useState, useEffect } from 'react'

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
  console.log("start")
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])

  useEffect(() => {
    console.log("effect used")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("response received and being outputted")
        setPersons(response.data)
      })
  }, [])
  
  /*
  const handleSearch = (event) => {
    const checkName = (person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }
    setNewSearch(event.target.value)
    setSearchedPersons(persons.filter(checkName))
  }*/

  console.log("end app")
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