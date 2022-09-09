import React from 'react';
import Header from '../components/Header';

class Settings extends React.Component {
  render() {
    return (
      <div data-testid="settings-title">
        <Header />
        <h1>Configurações</h1>
      </div>
    );
  }
}

export default Settings;
