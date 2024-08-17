import './style.css'
import Die from './Die.jsx'
import { number } from 'prop-types'
import React from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti" //celebration

function App() {


  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld) //method specific condition if else
    const firstValue = dice[0].value
    const allSameValue = dice.every(die =>die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("You won")
    }
    console.log("Dice state changed")
}, [dice])
  
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function allNewDice(){
      const newDice = []
      for (let i = 0; i<10; i++){
        newDice.push(generateNewDie())
      }
      return newDice
  }

  function generateNewDie() {
    return {
        number: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}

  function rollDice(){
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
  } else {
      setTenzies(false)
      setDice(allNewDice())
  }
  }
  
  const diceElements = dice.map(die => <Die
     key={die.id}
     number={die.number}
     isHeld = {die.isHeld}
     holdDice={() => holdDice(die.id)}
     />)
  
  return (
    <main className="main">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
       {diceElements}
       </div>
       <button 
       className='roll-dice'
      onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}

export default App
