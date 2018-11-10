import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions';
import './AppNav.css';
import UserAPI from '../../api/UserAPI';

class AppNav extends Component {
  state = {
    isOpen: false
  }

  componentDidMount() {
    global.onSignIn = googleUser => {
      const userEmail = googleUser.getBasicProfile().U3
      UserAPI.loginUser(userEmail)
        .then(userData => {
          this.props.dispatch(setUser(userData))
        })
    }
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  handleSignOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      window.location.reload();
    })
  }

  render() {
    return (
      <div className="appNav"> 
        <Navbar color="light" light expand="md" className="border">
          <LinkContainer to="/" >
            <NavbarBrand href="">trial by combat</NavbarBrand>
          </LinkContainer>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.user ? this.props.user.email : 'Sign In'}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <div className={this.props.user ? "g-signin2 hide" : "g-signin2"} data-onsuccess="onSignIn"></div>
                    <div className={this.props.user ? "g-signout" : "hide"} onClick={this.handleSignOut}>Sign Out</div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(AppNav);