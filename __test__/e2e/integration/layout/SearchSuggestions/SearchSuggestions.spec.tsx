import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/layout/SearchSuggestions/SearchSuggestions.stories'

const { Common } = composeStories(stories)

describe('[components] - SearchSuggestions Integration', () => {
  const userEnteredText = 'T'

  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const backdrop = screen.getByTestId('backdrop')

    expect(input).toBeVisible()
    expect(backdrop).not.toBeVisible()
  })

  it('should display user entered text on search bar input', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')

    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)
  })

  it('should display search suggestion when user entered the text on search bar', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    const suggestions = await screen.findByText('suggestions')
    const categories = await screen.findByText('categories')
    const separator = await screen.findByRole('separator')
    expect(suggestions).toBeVisible()
    expect(categories).toBeVisible()
    expect(separator).toBeInTheDocument()

    const count = Common.args?.searchSuggestionResult?.suggestionGroups?.length || 0
    expect(screen.getAllByRole('group')).toHaveLength(count)
  })

  it('should display backdrop when search suggustion opens', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    const suggestions = await screen.findByText('suggestions')
    expect(suggestions).toBeVisible()
    const backdrop = await screen.findByTestId('backdrop')
    expect(backdrop).toBeVisible()
  })

  it('should clear the search input when user clicks on cross button', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const clearButton = screen.getByRole('button', { name: 'clear-search' })
    userEvent.type(input, userEnteredText)

    expect(input).toHaveValue(userEnteredText)
    expect(clearButton).toBeEnabled()
    userEvent.click(clearButton)

    expect(input).toHaveValue('')
  })
})
