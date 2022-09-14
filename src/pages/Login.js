import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenThunk, getInfos } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
  }

  componentDidUpdate() {
    const { token, history } = this.props;
    localStorage.setItem('token', token);
    if (token.length > 0) {
      history.push('/game');
    }
  }

  settingsRedirect = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleNameEmail = () => {
    const { name, email } = this.state;
    const regularExpression = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const verifyEmail = regularExpression.test(email);
    const ONE = 1;
    const namePassword = name.length >= ONE;
    const emailAndNameVerify = verifyEmail && namePassword;
    this.setState({ isDisable: !emailAndNameVerify });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleNameEmail());
  };

  handleStart = () => {
    const { dispatch } = this.props;
    const { name, email } = this.state;
    dispatch(getTokenThunk());
    dispatch(getInfos(name, email));
  };

  render() {
    const { email, name, isDisable } = this.state;
    return (
      <form>

        <label htmlFor="input-player-name">
          Seu nome:
          <input
            data-testid="input-player-name"
            type="text"
            onChange={ this.handleChange }
            name="name"
            value={ name }
          />
        </label>

        <label htmlFor="input-gravatar-email">
          Seu email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            name="email"
            value={ email }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisable }
          onClick={ this.handleStart }
        >
          Começar jogo
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.settingsRedirect }
        >
          Configurações
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.player.token,
});

Login.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
