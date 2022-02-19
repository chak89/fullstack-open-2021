import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'


//The request's authorization header contains the token if one has been saved to the localStorage.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('LoggedInUser')
	console.log('AUTHLINK - token:', token)
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

console.log('authLink.concat(httpLink):', authLink.concat(httpLink))

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink)
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
)