import {BUTTONS} from './constants.js'
import { FormulaDisplay } from './components/FormulaDisplay.jsx'
import { CurrentDisplay } from './components/CurrentDisplay.jsx'
import { Button } from './components/Button.jsx'
import './app.css'
import { useState } from 'react'


export function App() {
  const [inputElement, setInputElement] = useState("0")
  const [resultElement, setResultElement] = useState("0")
  return (
    <>
    <div className="calculator-container">
      <div className="calculator-displayer">
        <FormulaDisplay display={inputElement}/>
        <CurrentDisplay display={resultElement}/>
      </div>
      <div className="calculator-body">
        {BUTTONS.map(({name, value, classItem}, index)=>{
          return (<Button key={index} id={classItem.toLowerCase()} name={name} value={value} classItem={classItem} setInput={setInputElement} calculate={setResultElement}></Button>)
        })}
      </div>
    </div>
    </>
  )
}
