import { useState, effectHook, useEffect } from 'react'
import Persons from './Components/Persons'
import AddPerson from './Components/AddPerson'
import Filter from './Components/Filter'
import pbService from './services/phonebookService'
import './index.css'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [reRender, setReRender] = useState('')
  const [notifMsg, setNotifMsg] = useState('')

  useEffect(() => {
    pbService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [reRender])

  const hasArray = (ar, key, value) => {
    const foundItem = ar.find(item => item[key] === value)
    if (foundItem) {
      return true;
    }
    return false
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  const handleNumChange = (event) => {
      setNewNumber(event.target.value)
  }
  const handleFilterChange = event => {
    setFilter(event.target.value)
  }
  const remove = (person) => {
    console.log('removesta', person)
    if (confirm(`Do you want to permanently delete ${person.name} from phonebook?`)) {
      pbService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
        console.error('Error removing person:', error)
        });
      setReRender('removed', person.id)
      setNotifMsg(
        `Person '${person.name}' removed succesfully`
      )
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: (persons.length+1)
    }
    if(!hasArray(persons, 'name', person.name )) {

      setNewName('')
      setNewNumber('')

      pbService
        .create(person)
        .then(response => {
          console.log(response)
        })
      setReRender('updated persons')
      setNotifMsg(
        `Persons '${person.name}' added to phonebook`
      )
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)

    } else if(hasArray(persons, 'name', person.name ) && !hasArray(persons, 'number', person.number )) {

        const existingPerson = persons.find(p => p.name === person.name)
        if (confirm(`Do you want to update persons ${person.name} number?`)){

          pbService
            .update(existingPerson.id, person)
            .then(response => {
              setPersons([...persons, response.data])
            })
          setReRender('updated', existingPerson.id)
          setNotifMsg(
            `Persons '${person.name}' number (sometimes) succesfully updated`
          )
          setTimeout(() => {
            setNotifMsg(null)
          }, 5000)
        }
    } else {
      setNotifMsg(
        `Persons '${person.name}' already added to phonebook`
      )
      setTimeout(() => {
        setNotifMsg(null)
      }, 5000)
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMsg} />
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <AddPerson 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        addPerson={addPerson}
      />
      <Persons persons={filteredPersons} remove={remove} />

    </div>
  )
}

export default App