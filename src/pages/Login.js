import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };
  }

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

      </form>
    );
  }
}

export default Login;
