import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';


describe('Testa a página de Ranking', () => {
    const playerInfo = [
            {
                name: "jogador",
                score: 231,
                picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"},
            {
                name: "alguém",
                score: 105,
                picture: "https://www.gravatar.com/avatar/eefc51382a9e7864371ebb093f29bb0b"
            }]

    it('Testa se o botão "Ir ao início" funciona', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        localStorage.setItem('Ranking', JSON.stringify(playerInfo));
        history.push('/ranking');

        const buttonHome = screen.getByTestId('btn-go-home');

        expect(buttonHome).toBeInTheDocument();

        userEvent.click(buttonHome);

        expect(history.location.pathname).toBe('/');
    });

    it('Testa se a página é renderizada com o Ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        localStorage.setItem('Ranking', JSON.stringify(playerInfo))
        history.push('/ranking');

        expect(history.location.pathname).toBe('/ranking');
    })
})