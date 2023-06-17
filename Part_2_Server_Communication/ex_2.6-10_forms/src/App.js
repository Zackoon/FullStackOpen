import { useState, useEffect } from 'react'
import personService from './services/persons'

// refactor into Search, AddNew, People -> Person within that

const Search = ({persons, newSearch,    setNewSearch, searchedPersons, setSearchedPersons}) => {
  console.log('search start')
  const handleSearch = (event) => {
    const checkName = (person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    }
    setNewSearch(event.target.value)
    setSearchedPersons(persons.filter(checkName))
  }
  console.log('search end')
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

    const newPerson = {name: newName,
                        number: newNumber}

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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

const People = ({persons, searchedPersons, newSearch, setPersons}) => {
  return (
  <div>
    {newSearch == "" 
        ? persons.map(person => <Person person={person} key={person.id} setPersons={setPersons} persons={persons}/>) 
        : searchedPersons.map(person => <Person person={person} key={person.id} setPersons={setPersons} persons={persons}/>) 
    }
  </div>
  )
}

const Person = ({person, setPersons, persons}) => {
  return (
  <div> {person.name} {person.number}
    <button 
      onClick={() => window.confirm('Are you sure you want to delete this person?') ? personService.deletePerson(person.id)
                    .then(() => {setPersons(persons.filter(p => p.id !== person.id))}) : null}>delete</button>
  </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [searchedPersons, setSearchedPersons] = useState([])

  useEffect(() => {
      personService
      .getAll()
      .then(returnedPeople => {
        console.log('got people')
        setPersons(returnedPeople)
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
              newSearch={newSearch}
              setPersons={setPersons}/>
    </div>
  )
}

export default App