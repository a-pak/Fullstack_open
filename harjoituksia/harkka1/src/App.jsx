import { useState } from 'react'
import Display from './Display'
import Button from './Button'

const App = () => {

  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {
    setCounter(counter +1)
    console.log('Additioned by one')
  }
  const decreaseByOne = () => {
    setCounter(counter - 1)
    console.log('Decreased by one')
  }
  const setToZero = () => {
    setCounter(0)
    console.log('Set to zero')
  }

  return (
    <>
    <Display counter={counter}/>
    <Button
      handleClick={increaseByOne}
      text='PLUS'
    />    
    <Button 
      handleClick={decreaseByOne}
      text='MINUS'
    />
    <Button 
      handleClick={setToZero}
      text='ZERO'
    />
    
    </>
  )
}

export default App