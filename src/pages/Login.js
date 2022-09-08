import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
  }

  settingsRedirect = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleNameEmail = () => {
    const { name, email } = this.state;
    if (name.length === 0 || email.length === 0) {
      this.setState({ isDisable: true });
    } else {
      this.setState({ isDisable: false });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.handleNameEmail());
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
