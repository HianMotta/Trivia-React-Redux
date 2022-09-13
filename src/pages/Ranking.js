import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetPlayerInfo } from '../redux/actions';

class Ranking extends React.Component {
  handleHomeButton = () => {
    const { history, dispatch } = this.props;
    dispatch(resetPlayerInfo());
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        <Header />
        <h1>Ranking!</h1>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
