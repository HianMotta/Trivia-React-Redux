import React from 'react'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App'

const standardBeforeEach = () => renderWithRouterAndRedux(
  <App />,
  {
    initialState: {
      player: {
        name: 'teste',
        assertions: 0,
        score: 0,
        gravatarEmail: 'teste@email.com',
        token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6'
      }
    }
  }, '/game',
)

describe('testa o Header na página de jogo', () => {
  beforeEach(() => {
    standardBeforeEach()
  })
  it('', () => {
    
  })
})