import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

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
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { beBetterMsg, wellDoneMsg } = this.state;

    return (
      <div>
        <Header />
        <div>
          {beBetterMsg && <p data-testid="feedback-text">Could be better...</p>}
          {wellDoneMsg && <p data-testid="feedback-text">Well Done!</p>}
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectToHome }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
