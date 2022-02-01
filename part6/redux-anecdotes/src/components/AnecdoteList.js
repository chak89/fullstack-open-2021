import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(voteAnecdote(id))
	}

	const sortedAnecdotes = anecdotes.sort((a, b) => {
		return b.votes - a.votes
	})

	return (
		<>
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
		</>
	)
}

export default AnecdoteList