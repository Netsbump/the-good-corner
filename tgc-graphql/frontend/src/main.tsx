import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './contexts/AuthContext'
import './index.css'

// Initialize ApolloClient 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ApolloProvider>
    </StrictMode>,
  )
}
