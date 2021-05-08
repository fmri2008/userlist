import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import AddUser from './components/add-user';
import EditUser from './components/edit-user';

import { connect } from 'react-redux';
import faker from 'faker';
import { createUser } from './redux/action-creators/create-user';

const App = (props) => {
  for (let i = 0; i < 50; i++) {
    const name = faker.name.findName().split(' ');
    const firstName = name[0];
    const lastName = name[1];
    const sex = Math.round(Math.random()) === 0 ? 'Female' : 'Male';
    const age = Math.ceil(15 + Math.random() * 30);
    const password = '111111';
    // props.createUser(firstName, lastName, sex, age, password);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add" component={AddUser} />
        <Route path="/edit" component={EditUser} />
      </Switch>
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => ({
  createUser: (firstName, lastName, sex, age, password, history) =>
    dispatch(createUser(firstName, lastName, sex, age, password, history)),
});

export default connect(null, mapDispatchToProps)(App);
