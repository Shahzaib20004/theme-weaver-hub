import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RealtimeProvider } from './contexts/RealtimeContext'
import { Routes } from './Routes'

// Conditionally import devtools only in development
const ReactQueryDevtools = React.lazy(() => 
  import('@tanstack/react-query-devtools').then(module => ({
    default: module.ReactQueryDevtools
  }))
)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RealtimeProvider>
          <Routes />
          {process.env.NODE_ENV === 'development' && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtools initialIsOpen={false} />
            </React.Suspense>
          )}
        </RealtimeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
