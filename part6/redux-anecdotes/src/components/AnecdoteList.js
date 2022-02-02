import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

	const anecdotes = useSelector(state => state.anecdotes)
	const textToFilter = useSelector(state => state.filter)
	const dispatch = useDispatch()

	const vote = (id, content) => {
		dispatch(voteAnecdote(id))

		dispatch(showNotification(`you voted '${content}'`))
		setTimeout(() => dispatch(removeNotification()), 5000);
	}

	const filteredAndSortedAnecdotes = anecdotes
		.filter((anecdote) => {return anecdote.content.toLowerCase().includes(textToFilter.toLowerCase())})
		.sort((a, b) => { return b.votes - a.votes })

	return (
		<>
			{filteredAndSortedAnecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList