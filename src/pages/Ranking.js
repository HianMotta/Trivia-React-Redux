import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Ranking extends React.Component {
  handleHomeButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        <Header />
        <h1>Ranking</h1>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
