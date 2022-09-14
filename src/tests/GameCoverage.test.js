import React from 'react'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'
import {falseData, data} from './mocks/mockQuestionsAPI'

const mockToken = '00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6';

const standardBeforeEach = () => renderWithRouterAndRedux(
  <App />,
  {
    player: {
      name: 'teste',
      assertions: 0,
      score: 0,
      gravatarEmail: 'teste@email.com',
      token: mockToken
    }
  }, '/game',
)

describe('testa o Header na página de jogo', () => {
  beforeEach(() => {
    localStorage.setItem('token', mockToken)
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data)
    })
    standardBeforeEach()
  })
  it('testa se a imagem correspondeu ao jogador', () => {
    const playerImg = screen.getByTestId('header-profile-picture')
    expect(playerImg.alt).toMatch('Avatar de teste')
  })
  it('testa se o nome do player aparece na tela corretamente', () => {
    const playerName = screen.getByTestId('header-player-name')
    expect(playerName.innerHTML).toMatch('teste')
  })
  it('testa se o score do player começa zerado', () => {
    const playerScore = screen.getByTestId('header-score')
    expect(playerScore.innerHTML).toMatch('0')
  })
})

describe('testa o comportamento caso o retorno da API seja inválido', () => {
  let renderReturn = ''
  beforeEach(() => {
    localStorage.setItem('token', mockToken)
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(falseData)
    })
    renderReturn = standardBeforeEach()
  })
  it('testa se o token foi deletado do storage', () => {
    const storage = localStorage.getItem('token')
    expect(storage).toBe(null)
  })
  it('testa se voltou á página de login', () => {
    expect(renderReturn.history.location.pathname).toMatch('/')
  })
})

// describe('testa o timer', () => {
//   beforeEach(() => {
//     localStorage.setItem('token', mockToken)
//     global.fetch = jest.fn().mockResolvedValue({
//       json: jest.fn().mockResolvedValue(data)
//     })
//     standardBeforeEach()
//   })
//   it('testa se o timer está visível e começa em 30s', () => {
//     const timer = screen.getByText('timer')
//     expect(timer).toBeInTheDocument()
//   })
// })

describe('testa os textos relacionados à pergunta', () => {
  beforeEach(() => {
    localStorage.setItem('token', mockToken)
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data)
    })
    standardBeforeEach()
  })
  it('verifica se a categoria está na página', () => {
    const category = screen.getByTestId('question-category')
    expect(category.innerHTML).toMatch('Science: Computers')
  })
  it('verifica se o enunciado da pergunta está na página', () => {
    const questionText = screen.getByTestId('question-text')
    expect(questionText.innerHTML).toMatch('On Twitter, what was the original character limit for a Tweet?')
  })
  it('verifica se as alternativas estão posicionadas', () => {
    const options = screen.getByTestId('answer-options')
    expect(options.children).toHaveLength(4)
  })
})

describe('verifica o comportamento ao clicar na resposta correta', () => {
  let renderReturn = ''
  beforeEach(() => {
    localStorage.setItem('token', mockToken)
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(data)
    })
    renderReturn = standardBeforeEach()
  })
  it('verifica se o score aumenta corretamente e o botao next aparece', () => {
    const correctOption = screen.getByTestId('correct-answer')
    userEvent.click(correctOption)
    
    const playerScore = screen.getByTestId('header-score')
    expect(playerScore.innerHTML).toMatch('40')
    const nextBtn = screen.getByRole('button', {name: /proxima pergunta/i})
    expect(nextBtn).toBeInTheDocument()
  })
  it('verifica se a próxima pergunta é exibida ao clicar no botão next', () => {
    const correctOption1 = screen.getByTestId('correct-answer')
    userEvent.click(correctOption1)

    const nextBtn1 = screen.getByRole('button', {name: /proxima pergunta/i})
    userEvent.click(nextBtn1)

    const category = screen.getByTestId('question-category')
    const questionText = screen.getByTestId('question-text')
    expect(category.innerHTML).toMatch('Entertainment: Video Games')
    expect(questionText.innerHTML).toMatch('In the Pok&amp;eacute;mon series, what is Palkia&amp;#039;s hidden ability?')
    
    const correctOption2 = screen.getByTestId('correct-answer')
    userEvent.click(correctOption2)
    const nextBtn2 = screen.getByRole('button', {name: /proxima pergunta/i})
    userEvent.click(nextBtn2)

    const correctOption3 = screen.getByTestId('correct-answer')
    userEvent.click(correctOption3)
    const nextBtn3 = screen.getByRole('button', {name: /proxima pergunta/i})
    userEvent.click(nextBtn3)

    const correctOption4 = screen.getByTestId('correct-answer')
    userEvent.click(correctOption4)
    const nextBtn4 = screen.getByRole('button', {name: /proxima pergunta/i})
    userEvent.click(nextBtn4)
    
    const correctOption5 = screen.getByTestId('correct-answer')
    userEvent.click(correctOption5)
    const nextBtn5 = screen.getByRole('button', {name: /proxima pergunta/i})
    userEvent.click(nextBtn5)

    expect(renderReturn.history.location.pathname).toMatch('/feedback')
  })
  // it('verifica se os botões desativam após 30s', async () => {
  //   const disabledBtn = await screen.findByRole('span', {name: '0'})
  //   expect(disabledBtn.disabled).toBeTruthy()
  // }, 32000)
})