import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Flex, Box } from 'rebass';
import { BlackButton, BlackInput } from './UIComponents';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  updateField = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  clearInput = () => {
    this.setState({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  logout = () => {
    Meteor.logout(error => {
      if (!error) {
        this.props.client.resetStore();
      }
    });
  };

  createUser = e => {
    e.preventDefault();

    if (this.state.login) {
      Meteor.loginWithPassword(this.state.email, this.state.password, error => {
        if (!error) {
          this.clearInput();
          this.props.client.resetStore();
        }
        console.log(error);
      });
    } else {
      Accounts.createUser(
        {
          email: this.state.email,
          password: this.state.password,
        },
        error => {
          if (!error) {
            this.clearInput();
            this.props.client.resetStore();
          }
          console.log(error);
        },
      );
    }
  };

  render() {
    return (
      <Flex>
        <Box>
          {!Meteor.userId() ? (
            <form onSubmit={e => this.createUser(e)}>
              <BlackInput
                my={1}
                type="email"
                value={this.state.email}
                onChange={e => this.updateField(e.target.value, 'email')}
                placeholder="Enter your email"
              />
              <BlackInput
                my={1}
                type="password"
                value={this.state.password}
                onChange={e => this.updateField(e.target.value, 'password')}
                placeholder="Enter your password"
              />
              {!this.state.login && (
                <BlackInput
                  my={1}
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={e => this.updateField(e.target.value, 'confirmPassword')}
                  placeholder="Confirm your password"
                />
              )}
              <BlackButton type="submit">{this.state.login ? 'Login' : 'Sign Up'}</BlackButton>
              <BlackButton
                type="button"
                ml={1}
                onClick={() => this.setState({ login: !this.state.login })}
              >
                {this.state.login ? 'Need to create an account?' : 'Already have an account?'}
              </BlackButton>
            </form>
          ) : (
            <BlackButton type="button" onClick={() => this.logout()}>
              Log Out
            </BlackButton>
          )}
        </Box>
      </Flex>
    );
  }
}
