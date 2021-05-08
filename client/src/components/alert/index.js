import './index.css';
import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alert }) => {
  return <div>{alert && <p className="alert">{alert}</p>}</div>;
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
