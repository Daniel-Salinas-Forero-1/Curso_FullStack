import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const Average = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all 

  return (
    <div>
      <p>Average : {average.toFixed(2)}</p>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  
  if (good !== 0 || neutral !== 0 || bad !== 0){
    
    return (
      <div>
        <h1> statistics </h1>
          <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>All</td>
              <td>{bad + good + neutral}</td>
            </tr>
            <tr>
              <td>average</td>
              <td><Average good={good} neutral={neutral} bad={bad}/></td>
            </tr>            
          </tbody>
        </table>     
      </div>
    )
  } else {
    return(
    <p>No Feedback Given</p>
    )
  }
}

const GenerateNewIndex = (index , max) => {
  let randomIndex = Math.floor(Math.random() * max)
  while (index === randomIndex) {
    randomIndex = Math.floor(Math.random() * max)
  }
  return randomIndex
}

const HandleClick = ({ index, anecdotes, text, setIndex }) => {
  
  const randomIndex = Math.floor(Math.random() * anecdotes.length)
  
  if (index === (-1)){
    return (
      <Button onClick={() => setIndex(randomIndex)} text={text} />
    )  
  }else {
    return(
      <div>
      <p>{anecdotes[index]}</p>
      <Button onClick={() => setIndex(GenerateNewIndex(index, anecdotes.length))} text={"New anecdote"} />
      </div>
    )
  }
}




const Vote = ({index, copy, text, setVotes, anecdotes}) => {
  console.log(copy)
  // Valor más alto
  let maxValue = Math.max(...copy)

  // Índice (posición) del valor más alto
  let maxIndex = copy.indexOf(maxValue)

  console.log(maxIndex)
  
  copy[index] += 1

  if (copy[index] === 1 || index === (-1)) {
    return (
      <div>
        <p>No hay votes</p>
        <Button onClick={() => setVotes(copy)} text={text} />
        <h1>Anecdote wiht most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
      </div>
    )
  }else{
    return(
      <div>
        <p>votes {copy[index] -1}</p>
        <Button onClick={() => setVotes(copy)} text={text} />
        <h1>Anecdote wiht most votes</h1>
        <p>{anecdotes[maxIndex]}</p>
      </div>
  )
  }
  
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [index, setIndex] = useState(-1)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [vote, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const copy = [...vote]
  

  return (
    <div>
      <h1> Give feedback </h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <Statistics  good={good} neutral={neutral} bad={bad} />

      <HandleClick index={index} anecdotes={anecdotes} text="anecdote" setIndex={setIndex}/>

      <Vote index={index} copy = {copy} text="vote" setVotes={setVotes} anecdotes={anecdotes}/>



    </div>
      
  )
}

export default App