import React from 'react'
import Person from './Person'

const Persons = ( {persons, remove} ) => {
  return (
    <div>
        <h2>Numbers</h2>      
        <ul>
            {persons.map(person =>
            <Person id={person.id} person={person} remove={remove}/>
            )}
        </ul>
    </div>
  )
}

export default Persons