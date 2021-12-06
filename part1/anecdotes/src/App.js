import React, { useState } from 'react'


const Button = ({btnClick, text}) => {
  return (
    <button onClick={btnClick}>{text}</button>
  )
}

const MostVoted = ({anecdotes, votes}) => {

  const newVotes =[];
  Object.entries(votes).forEach(
    ([key, value]) => newVotes[key] = Number(value)
  )
  const max = Math.max(...newVotes)
  const index = newVotes.indexOf(max)
  
  return (
  <div>
    <h1>Anecdote with most votes</h1>
    {anecdotes[index]}
    <div>
        has {max} votes 
    </div>
  </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])

  const getRnd = () => Math.floor(Math.random() * anecdotes.length);

  const getNextAnecdote = () => {
    setSelected(getRnd)
  }
  
  const voteAnecdote = () => {
    const copy = {...votes}
    copy[selected] += 1

    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        has {votes[selected]} votes 
      </div>
      <div>
        <Button btnClick={voteAnecdote} text='vote' />
        <Button btnClick={getNextAnecdote} text='next anecdote'/>
      </div>
      <MostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App