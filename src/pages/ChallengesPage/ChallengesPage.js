import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCableProvider } from 'react-actioncable-provider';
import './ChallengesPage.css';
import UserAPI from '../../api/UserAPI';
import ChallengeList from '../../components/ChallengeList/ChallengeList';
import { API_WS_ROOT } from '../../constants';

class ChallengesPage extends Component {
  state = {
    enemies: [],
    fetchedWithAvatar: false
  }

  componentDidMount() {
    if (this.props.avatar) {
      UserAPI.fetchEnemies(this.props.avatar.id)
        .then(enemies => this.setState({ enemies: enemies }))
    }
  }

  componentDidUpdate() {
    if (this.props.avatar && !this.state.fetchedWithAvatar) {
      UserAPI.fetchEnemies(this.props.avatar.id)
        .then(enemies => this.setState({ enemies: enemies, fetchedWithAvatar: true }))
    }
  }

  displayEnemies = () => {
    return this.state.enemies.map(enemy => {
      return (
        <div key={enemy.id} className="m-3">
          <div className="enemy"><span className="enemyName">{enemy.name}</span> ({enemy.reputation})</div>
        </div>
      )
    })
  }

  render() {
    return (
      <ActionCableProvider url={API_WS_ROOT}>
        <div className="challengesPage m-3">
          <div className="enemyList">
            <h5>Your Enemies:</h5>
            {this.displayEnemies()}
          </div>
          <ChallengeList />
        </div>
      </ActionCableProvider>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ChallengesPage);