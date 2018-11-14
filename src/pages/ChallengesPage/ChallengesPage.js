import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChallengesPage.css';
import UserAPI from '../../api/UserAPI';
import ChallengeList from '../../components/ChallengeList/ChallengeList';
import Enemy from '../../components/Enemy/Enemy';

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
      return <Enemy key={enemy.id} enemy={enemy} avatar={this.props.avatar}/>
    })
  }

  render() {
    return (
        <div className="challengesPage m-3">
          <div className="enemyList">
            <h5>Your Enemies:</h5>
            {this.displayEnemies()}
          </div>
          <ChallengeList />
        </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(ChallengesPage);