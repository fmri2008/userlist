import './index.css';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class UserRow extends PureComponent {
  onClickEdit = () => {
    const { history, user } = this.props;
    history.push({
      pathname: '/edit',
      state: { user: user },
    });
  };

  render() {
    const { user, onDelete } = this.props;
    return (
      <tr>
        <td>
          <button className="editbtn" onClick={this.onClickEdit}>
            <span>&#9998;</span> Edit
          </button>
        </td>
        <td>
          <button className="deletebtn" onClick={() => onDelete(user._id)}>
            <span>&#10539;</span> Delete
          </button>
        </td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.sex}</td>
        <td>{user.age}</td>
      </tr>
    );
  }
}

export default withRouter(UserRow);
