import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const nameTestId = 'input-player-name'
const emailTestId = 'input-gravatar-email'

describe('testa se os elementos estão sendo exibidos na tela corretamente', () => {
  let renderReturn = '';
  beforeEach(() => {
    renderReturn = renderWithRouterAndRedux(<App />)
    expect(renderReturn.history.location.pathname).toMatch('/')
  })
  it('verifica os campos de nome e email', () => {
    const nameInput = screen.getByTestId(nameTestId)
    const emailInput = screen.getByTestId(emailTestId)
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(emailInput.value).toMatch('')
    expect(emailInput.value).toMatch('')
  })
  it('verifica os botões "Começar jogo" e "Configurações"', () => {
    const startBtn = screen.getByRole('button', { name: 'Começar jogo' })
    const configBtn = screen.getByRole('button', { name: 'Configurações' })
    expect(startBtn).toBeInTheDocument()
    expect(startBtn.disabled).toBeTruthy()
    expect(configBtn).toBeInTheDocument()
  })
  it('verifica a validação dos inputs e habilitação do botão "Começar jogo"', () => {
    const validName = 'userTest'
    const validEmail = 'userTest@email.com'
    const nameInput = screen.getByTestId(nameTestId)
    const emailInput = screen.getByTestId(emailTestId)
    const startBtn = screen.getByRole('button', { name: 'Começar jogo' })

    userEvent.type(nameInput, validName)
    expect(startBtn.disabled).toBeTruthy()
    userEvent.type(emailInput, validEmail)
    expect(startBtn.disabled).toBeFalsy()
  })
  it('verifica o botão "Começar jogo" e o caminho correto para Configurações', () => {
    const validName = 'userTest'
    const validEmail = 'userTest@email.com'
    const nameInput = screen.getByTestId(nameTestId)
    const emailInput = screen.getByTestId(emailTestId)
    const startBtn = screen.getByRole('button', { name: 'Começar jogo' })
    const configBtn = screen.getByRole('button', { name: 'Configurações' })
    userEvent.type(nameInput, validName)
    userEvent.type(emailInput, validEmail)
    userEvent.click(startBtn)
    userEvent.click(configBtn)
    expect(renderReturn.history.location.pathname).toMatch('/settings')
  })
})