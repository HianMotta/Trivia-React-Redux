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
      isDisabled: false,
      timer: 30,
    };
  }

  componentDidMount() {
    this.verifyToken();
  }

  componentDidUpdate() {
    const { allAnswers } = this.state;
    if (allAnswers.length === 0) {
      this.createAnswers();
      this.interval();
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

  handleClick = () => {
    const { counter } = this.state;
    const FOUR = 4;
    if (counter < FOUR) {
      this.setState({
        counter: counter + 1,
        allAnswers: [],
        timer: 30,
        isDisabled: false });
    }
  };

  timeCounter = () => {
    const { timer } = this.state;
    this.setState({ timer: timer - 1 }, () => {
      if (timer === 0) {
        this.setState({ isDisabled: true });
      }
    });
  };

  interval = () => {
    const oneSecond = 1000;
    setInterval(() => this.timeCounter(), oneSecond);
  };

  render() {
    const { results, counter, allAnswers, timer, isDisabled } = this.state;
    return (
      <div>
        <Header />
        <span>{ timer }</span>
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
                disabled={ isDisabled }
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
                disabled={ isDisabled }
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
