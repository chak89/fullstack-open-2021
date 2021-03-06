import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

	const addAnecdote = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''

		props.createAnecdote(content)
		props.showNotification(`you created '${content}'`, 2)
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

const mapDispatchToProps = {
	createAnecdote,
	showNotification
}

export default connect(
	null,
	mapDispatchToProps
)(AnecdoteForm)