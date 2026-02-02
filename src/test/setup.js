import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Czyszczenie DOM po każdym teście
afterEach(() => {
  cleanup()
})
