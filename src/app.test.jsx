import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('renders the app title', () => {
    render(<App />)
    // Zakładam, że w Twoim App jest gdzieś tekst "Work Tracker" albo nagłówek
    // Zmień na to, co faktycznie masz w App
    expect(screen.getByText(/work tracker/i)).toBeInTheDocument()
  })
})
