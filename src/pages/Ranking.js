import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPlayerInfo } from '../redux/actions';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      playerInfo: [],
    };
  }

  componentDidMount() {
    this.getPlayerInfo();
  }

  getPlayerInfo = () => {
    const player = JSON.parse(localStorage.getItem('Ranking'));
    const menosUm = -1;
    const sortRanking = player.sort((a, b) => {
      if (b.score < a.score) { return menosUm; }
      if (b.score > a.score) { return 1; }
      return 0;
    });
    this.setState({
      playerInfo: sortRanking,
    });
  };

  handleHomeButton = () => {
    const { history, dispatch } = this.props;
    dispatch(resetPlayerInfo());
    history.push('/');
  };

  render() {
    const { playerInfo } = this.state;
    console.log(playerInfo);
    return (
      <div data-testid="ranking-title">
        <h1>Ranking!</h1>
        {playerInfo.map((player, index) => (
          <div key={ index }>
            <img
              src={ player.picture }
              alt={ player.name }
              data-testid="header-profile-picture"
            />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHomeButton }
        >
          Ir ao início
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
