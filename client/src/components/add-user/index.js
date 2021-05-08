import './index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from '../alert';
import { createUser } from '../../redux/action-creators/create-user';
import { showAlert } from '../../redux/action-creators/alert';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      sex: 'Default',
      age: null,
      password: null,
      password2: null,
      firstNameReady: false,
      lastNameReady: false,
      sexReady: false,
      ageReady: false,
      passwordReady: false,
      password2Ready: false,
    };
  }

  onFirstNameChange = (e) => {
    const { value } = e.target;
    if (value.length !== 0) {
      this.setState({ firstNameReady: true });
    } else {
      this.setState({ firstNameReady: false });
    }
    this.setState({ firstName: value });
  };

  onLastNameChange = (e) => {
    const { value } = e.target;
    if (value.length !== 0) {
      this.setState({ lastNameReady: true });
    } else {
      this.setState({ lastNameReady: false });
    }
    this.setState({ lastName: value });
  };

  onSexChange = (e) => {
    const { value } = e.target;
    if (value !== 'Default') {
      this.setState({ sexReady: true });
    } else {
      this.setState({ sexReady: false });
    }
    this.setState({ sex: value });
  };

  onAgeChange = (e) => {
    const { value } = e.target;
    if (Number.isInteger(+value) && value > 0) {
      this.setState({ ageReady: true });
    } else {
      this.setState({ ageReady: false });
    }
    this.setState({ age: value });
  };

  onPasswordChange = (e) => {
    const { value } = e.target;
    if (value.length >= 6) {
      this.setState({ passwordReady: true });
    } else {
      this.setState({ passwordReady: false });
    }
    if (value === this.state.password2) {
      this.setState({ password2Ready: true });
    } else {
      this.setState({ password2Ready: false });
    }
    this.setState({ password: value });
  };

  onPassword2Change = (e) => {
    const { value } = e.target;
    if (value === this.state.password) {
      this.setState({ password2Ready: true });
    } else {
      this.setState({ password2Ready: false });
    }
    this.setState({ password2: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, sex, age, password } = this.state;
    this.props.createUser(
      firstName,
      lastName,
      sex,
      age,
      password,
      this.props.history
    );
    this.props.showAlert('New User Created');
    // this.setState({
    //   firstName: null,
    //   lastName: null,
    //   sex: 'Default',
    //   age: null,
    //   password: null,
    //   password2: null,
    //   firstNameReady: false,
    //   lastNameReady: false,
    //   sexReady: false,
    //   ageReady: false,
    //   passwordReady: false,
    //   password2Ready: false,
    // });
  };

  render() {
    const {
      firstName,
      lastName,
      sex,
      age,
      password,
      password2,
      firstNameReady,
      lastNameReady,
      sexReady,
      ageReady,
      passwordReady,
      password2Ready,
    } = this.state;

    return (
      <div>
        <div className="header">
          <h2>Create User</h2>
          <Alert />
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName || ''}
              onChange={this.onFirstNameChange}
            />
            <label>
              {firstName !== null && !firstNameReady
                ? 'First Name must not be empty'
                : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName || ''}
              onChange={this.onLastNameChange}
            />
            <label>
              {lastName !== null && !lastNameReady
                ? 'Last Name must not be empty'
                : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="sex">Sex</label>
            <select id="sex" name="Sex" value={sex} onChange={this.onSexChange}>
              <option disabled value="Default">
                -- select an option --
              </option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              placeholder="Age"
              value={age || ''}
              onChange={this.onAgeChange}
            />
            <label>
              {age !== null && !ageReady
                ? 'Age must be a positive integer'
                : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password || ''}
              onChange={this.onPasswordChange}
            />
            <label>
              {password && !passwordReady
                ? 'Password must have at least 6 characters'
                : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="password2">Repeat</label>
            <input
              type="password"
              id="password2"
              placeholder="Repeat Password"
              value={password2 || ''}
              onChange={this.onPassword2Change}
            />
            <label>
              {password2 && !password2Ready ? 'Password must match' : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <div>
            <button
              className="button"
              type="submit"
              value="Add User"
              disabled={
                !firstNameReady ||
                !lastNameReady ||
                !sexReady ||
                !ageReady ||
                !passwordReady ||
                !password2Ready
              }
            >
              Submit
            </button>
          </div>
          <div>&nbsp;</div>
          <div>
            <button
              className="button"
              value="Go Back"
              onClick={() => this.props.history.push('/')}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUser: (firstName, lastName, sex, age, password, history) =>
    dispatch(createUser(firstName, lastName, sex, age, password, history)),
  showAlert: (msg, timeout) => dispatch(showAlert(msg, timeout)),
});

export default connect(null, mapDispatchToProps)(AddUser);
