import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de Feedback', () => {
    it('Testa se o botão "Ranking" redireciona para a respectiva página', () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
        const btnRanking = screen.getByTestId('btn-ranking');

        userEvent.click(btnRanking);
        
        expect(history.location.pathname).toBe('/ranking');
        
    })

    it('Testa se o botão "Play Again" redireciona para a página inicial', () => {
        const { history } = renderWithRouterAndRedux(<App />, {}, '/feedback');
        const btnPlayAgain = screen.getByTestId('btn-play-again');

        userEvent.click(btnPlayAgain);

        expect(history.location.pathname).toBe('/');
    })
})