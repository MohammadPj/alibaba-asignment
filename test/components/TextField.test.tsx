import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import TextField from "../../src/components/input/TextField";

describe('TextField component', () => {
  it('renders a label when provided and associates it with the input', () => {
    render(<TextField label="Username" inputProps={{ id: 'username-input' }} />)
    const labelElement = screen.getByText('Username')
    expect(labelElement).toBeInTheDocument()
    // In the rendered HTML, "htmlFor" becomes "for"
    expect(labelElement).toHaveAttribute('for', 'username-input')
  })

  it('renders helper text when provided and no error is present', () => {
    render(<TextField helperText="Enter your username" />)
    const helperText = screen.getByText('Enter your username')
    expect(helperText).toBeInTheDocument()
    // Check that helper text uses the normal styling (gray color)
    expect(helperText.className).toContain('text-gray-500')
  })

  it('renders error text and applies error styling when error is true', () => {
    render(
      <TextField
        label="Email"
    error
    errorText="Invalid email"
    inputProps={{ id: 'email-input' }}
    />
  )
    const labelElement = screen.getByText('Email')
    const errorText = screen.getByText('Invalid email')
    expect(labelElement).toBeInTheDocument()
    // The label should have error styling (red color)
    expect(labelElement.className).toContain('text-red-500')
    expect(errorText).toBeInTheDocument()
    expect(errorText.className).toContain('text-red-500')
  })

  it('renders startAdornment and endAdornment if provided', () => {
    render(
      <TextField
        startAdornment={<span data-testid="start-adornment">S</span>}
    endAdornment={<span data-testid="end-adornment">E</span>}
    />
  )
    expect(screen.getByTestId('start-adornment')).toBeInTheDocument()
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument()
  })

    it('applies the placeholder to the input element', () => {
      render(<TextField placeholder="Search..." inputProps={{ id: 'search-input' }} />)
      const inputElement = screen.getByPlaceholderText('Search...')
      expect(inputElement).toBeInTheDocument()
    })

    it('applies small size classes correctly', () => {
      render(<TextField size="small" inputProps={{ id: 'small-input' }} />)
      const inputElement = screen.getByRole('textbox')
      expect(inputElement.className).toContain('px-3')
      expect(inputElement.className).toContain('py-2')
      expect(inputElement.className).toContain('text-xs')
    })

    it('applies medium size classes correctly', () => {
      render(<TextField size="medium" inputProps={{ id: 'medium-input' }} />)
      const inputElement = screen.getByRole('textbox')
      expect(inputElement.className).toContain('px-4')
      expect(inputElement.className).toContain('py-3')
      expect(inputElement.className).toContain('text-sm')
    })

    it('applies large size classes correctly', () => {
      render(<TextField size="large" inputProps={{ id: 'large-input' }} />)
      const inputElement = screen.getByRole('textbox')
      expect(inputElement.className).toContain('px-5')
      expect(inputElement.className).toContain('py-4')
      expect(inputElement.className).toContain('text-base')
    })

    it('does not render helper text when withoutHelperText is true', () => {
      render(<TextField helperText="Helper text" withoutHelperText />)
      const helperText = screen.queryByText('Helper text')
      expect(helperText).not.toBeInTheDocument()
    })

    it('sets the input direction to RTL', () => {
      render(<TextField inputProps={{ id: 'rtl-input' }} />)
      const inputElement = screen.getByRole('textbox')
      expect(inputElement).toHaveAttribute('dir', 'rtl')
    })
  })