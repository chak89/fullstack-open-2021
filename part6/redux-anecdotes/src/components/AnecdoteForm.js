import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''


		const newAnecdote = createAnecdote(content)
		await anecdoteService.createNew(newAnecdote.data)
		dispatch(newAnecdote)

		dispatch(showNotification(`you created '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000);
	}

	return (
		<>
		<h2>create new</h2>
		<form onSubmit={addAnecdote}>
			<div><input name="anecdote" /></div>
			<button type="submit">create</button>
		</form>
		</>
	)
}

export default AnecdoteForm