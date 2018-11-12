import React, { Component } from 'react';

import { connect } from 'react-redux';

import './EnemyList.css';
import UserAPI from '../../api/UserAPI';

class EnemyList extends Component {
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
      <div className="enemyList m-3">
        <h2>Your Enemies:</h2>
        {this.displayEnemies()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(EnemyList);