import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <p data-testid="feedback-total-question">{ `Acertos: ${assertions}` }</p>
        <p data-testid="feedback-total-score">{ `Pontuação: ${score}` }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
