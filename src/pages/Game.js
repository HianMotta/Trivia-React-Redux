import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../services/questionsAPI';
import Header from '../components/Header';
import { increasePoints } from '../redux/actions/index';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      counter: 0,
      allAnswers: [],
      isDisabled: false,
      timer: 30,
      wasAnswered: false,
    };
  }

  componentDidMount() {
    this.verifyToken();
    const oneSecond = 1000;
    this.clock = setInterval(() => this.timeCounter(), oneSecond);
  }

  componentDidUpdate() {
    const { allAnswers } = this.state;
    if (allAnswers.length === 0) {
      this.createAnswers();
    }
  }

  componentWillUnmount() {
    clearInterval(this.clock);
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

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
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
    const { dispatch } = this.props;
    const { timer } = this.state;
    if (target.id === 'correct-answer') {
      const amountIncrease = this.calculateDifficulty(timer);
      dispatch(increasePoints(amountIncrease));
    }
    this.stopTimer();
    this.setState({ wasAnswered: true });
  };

  nextButtonHandleClick = () => {
    const { counter } = this.state;
    const { history } = this.props;
    const FOUR = 4;
    const oneSecond = 1000;
    if (counter < FOUR) {
      this.setState({
        counter: counter + 1,
        allAnswers: [],
        timer: 30,
        isDisabled: false,
        wasAnswered: false,
      }, () => {
        this.clock = setInterval(() => this.timeCounter(), oneSecond);
        return this.clock;
      });
      this.handleResetBorderCollor();
    }
    if (counter >= FOUR) {
      history.push('/feedback');
    }
  };

  timeCounter = () => {
    const { timer } = this.state;
    this.setState({ timer: timer - 1 }, () => {
      if (timer <= 0) {
        this.setState({ timer: 0, isDisabled: true, wasAnswered: true });
        this.stopTimer();
        this.handleSetBorderCollor();
      }
    });
  };

  stopTimer = () => {
    clearInterval(this.clock);
  };

  handleSetBorderCollor = () => {
    const correctAnswer = document.querySelector('#correct-answer');
    const wrongAnswer = document.querySelectorAll('#wrong-answer');

    correctAnswer.style.border = '3px solid rgb(6, 240, 15)';

    wrongAnswer.forEach((element) => {
      element.style.border = '3px solid red';
    });
  };

  handleResetBorderCollor = () => {
    const correctAnswer = document.querySelector('#correct-answer');
    const wrongAnswer = document.querySelectorAll('#wrong-answer');

    correctAnswer.style.border = '';
    wrongAnswer.forEach((element) => {
      element.style.border = '';
    });
  };

  render() {
    const { results, counter, allAnswers, timer, isDisabled, wasAnswered } = this.state;
    return (
      <div>
        <Header />
        <span>
          Timer:
          { timer }
        </span>
        { results[counter]
        && (
          <div>
            <h1 data-testid="question-category">{results[counter].category}</h1>
            <h2 data-testid="question-text">
              {this.decodeEntity(results[counter].question)}
            </h2>
          </div>)}
        <div data-testid="answer-options">
          {allAnswers.map((answer, index) => (
            answer === results[counter].correct_answer ? (
              <button
                onClick={ (e) => { this.handleSetBorderCollor(); this.handleClick(e); } }
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
                onClick={ (e) => { this.handleSetBorderCollor(); this.handleClick(e); } }
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
        { wasAnswered
        && (
          <button
            onClick={ this.nextButtonHandleClick }
            data-testid="btn-next"
            type="button"
          >
            Proxima pergunta
          </button>
        ) }

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

const mapStateToProps = (state) => ({
  pontos: state.player.score,
});

export default connect(mapStateToProps)(Game);
