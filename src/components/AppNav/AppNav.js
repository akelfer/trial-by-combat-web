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

import './AppNav.css';
import UserApi from '../../api/UserApi';

export default class AppNav extends Component {
  state = {
    isOpen: false
  }

  componentDidMount() {
    let state = this.state
    global.onSignIn = googleUser => {
      const userEmail = googleUser.getBasicProfile().U3
      UserApi.loginUser(userEmail).then(userData => {
        this.props.handleSignIn(userData)
        this.setState({ state })
      })
    }
  }

  toggleNav = () => {
    this.setState({ isOpen: !this.state.isOpen })
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
                    <div className={this.props.user ? "g-signout" : "hide"} onClick={this.props.handleSignOut}>Sign Out</div>
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
