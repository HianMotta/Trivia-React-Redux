import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, email } = this.props;
    const hashPlayer = md5(email).toString();
    const urlImg = `https://www.gravatar.com/avatar/${hashPlayer}`;
    return (
      <div>
        <img
          src={ urlImg }
          data-testid="header-profile-picture"
          alt={ `Avatar de ${name}` }
        />
        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">
          0
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
