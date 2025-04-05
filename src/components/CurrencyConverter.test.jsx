import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CurrencyConverter from './CurrencyConverter'; // Adjust the path to your main component
import CurrencyContext from '../contexts/CurrencyContext'; // Adjust the path to your context

describe('CurrenyConverter Component', () => {
  it('should render correctly', () => {
    // Arrange: Render the component
    render(
        <CurrencyContext.Provider value = {{
            fromCurrency: 'USD',
            toCurrency: 'EUR'
        }}>
            <CurrencyConverter />
        </CurrencyContext.Provider>
    )

    // Act: Simulate any user interactions if necessary (not needed in this case)

    // Assert: Check that the rendered page contains some content
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
    expect(screen.getByText('=')).toBeInTheDocument()
    expect(screen.getByText('EUR')).toBeInTheDocument()
  })

  it('should show the correct output for a given input', () => {
    // Arrange: Render the component
    render(
        <CurrencyContext.Provider value = {{
            fromCurrency: 'SGD',
            toCurrency: 'USD'
        }}>
            <CurrencyConverter />
        </CurrencyContext.Provider>
    )
    
    // Act
    const fromAmountInput = screen.getByPlaceholderText("Enter amount") 
    fireEvent.change(fromAmountInput, { target: { value: '10' } })

    // Assert: Check that the output is correct
    expect(screen.getByText('20')).toBeInTheDocument() 
  })

  it('should output default value when user input is cleared', () => {
    // Arrange
    render(
        <CurrencyContext.Provider value = {{
            fromCurrency: 'SGD',
            toCurrency: 'USD'
        }}>
            <CurrencyConverter />
        </CurrencyContext.Provider>
    )

    // Act
    const fromAmountInput = screen.getByPlaceholderText("Enter amount")
    fireEvent.change(fromAmountInput, { target: { value: '10' } })
    fireEvent.change(fromAmountInput, { target: { value: '' } })

    expect(screen.getByText('0')).toBeInTheDocument()

  })

})