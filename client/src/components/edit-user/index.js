import './index.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from '../alert';
import { updateUser } from '../../redux/action-creators/update-user';
import { showAlert } from '../../redux/action-creators/alert';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  sex: 'Default',
  age: null,
  password: null,
  password2: null,
  firstNameReady: true,
  lastNameReady: true,
  sexReady: true,
  ageReady: true,
  passwordReady: false,
  password2Ready: false,
};

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { user } = this.props.location.state;
    this.setState({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      age: user.age,
    });
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
    const { updateUser, history, showAlert } = this.props;
    const { id, firstName, lastName, sex, age, password } = this.state;
    e.preventDefault();
    updateUser(id, firstName, lastName, sex, age, password, history);
    showAlert('User updated');
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
          <h2>Edit User</h2>
          <Alert />
        </div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName || ''}
              onChange={this.onFirstNameChange}
            />
            <label>
              {firstName && !firstNameReady
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
              value={lastName || ''}
              onChange={this.onLastNameChange}
            />
            <label>
              {lastName && !lastNameReady ? 'Last Name must not be empty' : ''}
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
              <option value="Not Sure">Not Sure</option>
            </select>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              value={age || ''}
              onChange={this.onAgeChange}
            />
            <label>
              {age && !ageReady ? 'Age must be a positive integer' : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
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
              value={password2 || ''}
              onChange={this.onPassword2Change}
            />
            <label>
              {password2 && !password2Ready ? 'Password must match' : ''}
            </label>
          </div>
          <div>&nbsp;</div>
          <input
            className="button"
            type="submit"
            value="Update User"
            disabled={
              !firstNameReady ||
              !lastNameReady ||
              !sexReady ||
              !ageReady ||
              !passwordReady ||
              !password2Ready
            }
          />
          <div>&nbsp;</div>
          <input
            className="button"
            type="button"
            value="Go Back"
            onClick={() => this.props.history.push('/')}
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToState = (dispatch) => ({
  updateUser: (id, firstName, lastName, sex, age, password, history) =>
    dispatch(updateUser(id, firstName, lastName, sex, age, password, history)),
  showAlert: (msg) => dispatch(showAlert(msg)),
});

const WithRouterEditUser = withRouter(EditUser);

export default connect(null, mapDispatchToState)(WithRouterEditUser);
