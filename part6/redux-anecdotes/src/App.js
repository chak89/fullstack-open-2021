import React from 'react'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(voteAnecdote(id))
	}

	const sortedAnecdotes = anecdotes.sort((a, b) => {
		return b.votes - a.votes
	})

	return (
		<div>
			<h2>Anecdotes</h2>
			{sortedAnecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
			<AnecdoteForm />
		</div>
	)
}

export default App