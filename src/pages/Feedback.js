import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { resetPlayerInfo } from '../redux/actions';

class Feedback extends Component {
  constructor(props) {
    const { assertions } = props;
    const THREE = 3;
    super(props);
    this.state = {
      beBetterMsg: assertions < THREE,
      wellDoneMsg: assertions >= THREE,
    };
  }

  redirectToHome = () => {
    const { history, dispatch } = this.props;
    dispatch(resetPlayerInfo());
    history.push('/');
  };

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/Ranking');
  };

  render() {
    const { beBetterMsg, wellDoneMsg } = this.state;
    const { assertions, score } = this.props;

    return (
      <div>
        <Header />
        <div>
          {beBetterMsg && <p data-testid="feedback-text">Could be better...</p>}
          {wellDoneMsg && <p data-testid="feedback-text">Well Done!</p>}
        </div>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToHome }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});
Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Feedback);
