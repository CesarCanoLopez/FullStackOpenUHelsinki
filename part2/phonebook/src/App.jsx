import { useState, useEffect } from 'react'
import noteService from './services/notes'

const Notification = ({message}) => {
  const notificationStyle = {
    color: "green",
    border: "green solid 1px",
    background: "lightgrey",
    fontsize: "20px",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className='error'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  const notificationStyle = {
    color: "red",
    border: "red solid 1px",
    background: "lightgrey",
    fontsize: "20px",
    borderRadius: 5,
    margin: 10,
    padding: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className='error'>
      {message}
    </div>
  )
}

const Person = ({person, handleDeletePerson}) => {
  return(
    <>
      <p>{person.name} {person.number}</p> <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
    </>
  )
}

const Persons = ({personsToShow, handleDeletePerson}) => {
  return(
    <>
      <h2>Numbers</h2>
      {personsToShow.map(person => {
        return(
          <div key={person.id}>
            <Person key={person.name} person={person} handleDeletePerson={handleDeletePerson}/>
          </div>
          )}
        )
      }
    </>
  )
}

const FormPersons = ({newName, newPhone, handleModifyName, handleModifyPhone, handleAddPerson}) => {
  return(
    <>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleModifyName} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handleModifyPhone} />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>add</button>
        </div>
      </form>
    </>
    
  )
}

const Filter = ({newSearch, handleModifySearch}) => {
  return(
  <div>filter shown with <input value={newSearch} onChange={handleModifySearch} /></div>)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [personsToShow, setPersonsToShow] = useState(persons) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response)
        setPersonsToShow(response)
      })
  }, [])

  const handleModifyName = (event) => {
    setNewName(event.target.value)
  }

  const handleModifyPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleModifySearch = (event) => {
    const searchQuery = event.target.value;
    setNewSearch(searchQuery)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()) ))
  }

  const handleDeletePerson = (id, name) => {
    if(window.confirm(`Are you sure you want to delete ${name}? `)) {
      noteService
      .deleteId(id)
      .then(() => {
        const newpersons = persons.filter(person => person.id !==id )
        setPersons(newpersons)
        setPersonsToShow(newpersons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) ))
      }
      )
    }
  } 
  const handleAddPerson = (event) => {
    event.preventDefault()
    const repeatedPerson = persons.find(person => person.name === newName)
    if (repeatedPerson) {
      if(window.confirm(`${repeatedPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        noteService
          .changeNumber(repeatedPerson, newPhone)
          .then(response => {
            const newpersons = persons.map(person => person.id !== response.id ? person : response)
            setPersons(newpersons)
            setPersonsToShow(newpersons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) ))            
            setNewName("")
            setNewPhone("")
          })
          .catch(() => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
          }
        )
      }
      setNewName("")
    }

    else{
      const newPersonObject = {
        name: newName,
        number: newPhone,
      }
      noteService
        .create(newPersonObject)
        .then(
          response => {
            const newpersons = persons.concat(response)
            setPersons(newpersons)
            setPersonsToShow(newpersons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) ))
            setAddedMessage(
              `${newName} has beeing successfully added`
            )
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
            setNewName("")
            setNewPhone("")
          }
        )
    }
  }
  return (
    <div>
      <Notification message={addedMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter handleModifySearch={handleModifySearch} newSearch={newSearch}/>
      <FormPersons newName={newName} newPhone={newPhone} handleAddPerson={handleAddPerson} handleModifyName={handleModifyName} handleModifyPhone={handleModifyPhone}/>
      <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App