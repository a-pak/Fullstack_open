import React from 'react'

const AddPerson = ({
    newName,
    newNumber,
    handleNameChange,
    handleNumChange,
    addPerson
}) => {
  
    return (
        <div>
            <form onSubmit={addPerson}>
                <div> name: <input value={newName} onChange={handleNameChange}/> </div>
                <div> number: <input value={newNumber} onChange={handleNumChange}/> </div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default AddPerson