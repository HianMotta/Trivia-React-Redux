import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../services/questionsAPI';
import Header from '../components/Header';
import { increaseScore } from '../redux/actions/index';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      counter: 0,
      allAnswers: [],
    };
  }

  componentDidMount() {
    this.verifyToken();
  }

  componentDidUpdate() {
    const { allAnswers } = this.state;
    if (allAnswers.length === 0) {
      this.createAnswers();
    }
  }

  createAnswers = () => {
    const { results, counter } = this.state;
    const answers = [...results[counter]
      .incorrect_answers, results[counter].correct_answer];
    const shuffled = answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    this.setState({ allAnswers: shuffled });
  };

  verifyToken = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await fetchQuestions(token);
    const invalidResponseCode = 3;
    if (data.response_code === invalidResponseCode) {
      localStorage.removeItem('token');
      history.push('./');
    } else {
      this.setState({ results: data.results });
    }
  };

  calculateDifficulty = (timer) => {
    const { results, counter } = this.state;
    const DEFAULT_SCORE = 10;
    const MEDIUM = 2;
    const HARD = 3;
    switch (results[counter].difficulty) {
    case 'easy':
      return DEFAULT_SCORE + timer;
    case 'medium':
      return DEFAULT_SCORE + (timer * MEDIUM);
    case 'hard':
      return DEFAULT_SCORE + (timer * HARD);
    default:
      return 0;
    }
  };

  handleClick = ({ target }) => {
    const correctAnswer = document.querySelector('#correct-answer');
    const wrongAnswer = document.querySelectorAll('#wrong-answer');

    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    wrongAnswer.forEach((element) => {
      element.style.border = '3px solid red';
    });

    const { dispatch } = this.props;
    const DEFAULT_TIMER = 10;
    if (target.id === 'correct-answer') {
      const amountIncrease = this.calculateDifficulty(DEFAULT_TIMER);
      dispatch(increaseScore(amountIncrease));
    }
  };

  // handleResetBorderCollor = () => {
  //   const correctAnswer = document.querySelector('#correct-answer');
  //   const wrongAnswer = document.querySelectorAll('#wrong-answer');

  //   correctAnswer.style.border = 'none';

  //   wrongAnswer.forEach((element) => {
  //     element.style.border = '3px solid red';
  //   });
  // };

  render() {
    const { results, counter, allAnswers } = this.state;
    return (
      <div>
        <Header />
        { results[counter]
        && (
          <div>
            <h1 data-testid="question-category">{results[counter].category}</h1>
            <h2 data-testid="question-text">{results[counter].question}</h2>
          </div>)}
        <div data-testid="answer-options">
          {allAnswers.map((answer, index) => (
            answer === results[counter].correct_answer ? (
              <button
                onClick={ this.handleClick }
                key={ index }
                type="button"
                id="correct-answer"
                data-testid="correct-answer"
              >
                {answer}
              </button>
            ) : (
              <button
                onClick={ this.handleClick }
                key={ index }
                type="button"
                id="wrong-answer"
                data-testid={ `wrong-answer-${index}` }
              >
                {answer}
              </button>
            )
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
