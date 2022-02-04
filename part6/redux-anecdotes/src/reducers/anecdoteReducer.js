import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


export const createAnecdote = (content) => {
	return async dispatch => {

		const newAnecdoteData = {
			content,
			id: getId(),
			votes: 0
		}

		const returnedNewAnecdoteData = await anecdoteService.createNew(newAnecdoteData)
		dispatch({
			type: 'NEW_ANECDOTE',
			data: returnedNewAnecdoteData
		})
	}
}

export const voteAnecdote = (id) => {
	return {
		type: 'VOTE',
		data: {
			id: id
		}
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		})
	}
}

const initialState = []
const anecdoteReducer = (state = initialState, action) => {
	/* 	console.log('state now: ', state)
		console.log('action', action) */

	switch (action.type) {
		case 'VOTE':
			const id = action.data.id
			const anecdoteToVote = state.find(elem => elem.id == id)
			const changedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1
			}

			return state.map(elem =>
				elem.id !== id ? elem : changedAnecdote
			)

		case 'NEW_ANECDOTE':
			const newState = [...state, action.data]
			return newState

		case 'INIT_ANECDOTES':
			return action.data

		default:
			return state
	}
}

export default anecdoteReducer