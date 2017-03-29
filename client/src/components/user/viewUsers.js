import React, { Component, PropTypes } from 'react';
import { Button, Icon, Modal } from 'react-materialize';
import { connect } from 'react-redux';
import Dialog from '../diaLog/confirmDialog';
import '../../main.scss';
import { editUser, deleteUser } from '../../actions/actionCreator';

class ViewUsers extends Component {
  constructor() {
    super();

    this.handleUserDelete = this.handleUserDelete.bind(this);
  }
  handleUserEdit() {
    const userId = this.props.user.id;
    const data = {
      username: this.refs.username.value,
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value
    };
    this.props.editUser(userId, data);
  }
  handleUserDelete() {
    const userId = this.props.user.id;
    this.props.deleteUser(userId);
  }

  render() {
    return (
      <div>
        <div className="row">
          <form className="col s6 offset-s3">
            <ul className="collection with-header">
              <li className="collection-item">
                <div className="row">
                  <div className="users">
                    <div className="col s2">{this.props.user.username}</div>
                    <div className="col s2">{this.props.user.firstname}</div>
                    <div className="col s3">{this.props.user.lastname}</div>
                    <div className="col s5 email">{this.props.user.email}</div>
                  </div>
                </div>
                <Modal
                  header="Manage User"
                  actions={[<Button style={{ marginLeft: `${2}em` }} className="btn-cancel" waves="light" modal="close" flat>Close</Button>, <Button waves="light" flat className="btn-save" onClick={this.handleUserEdit.bind(this)} modal="close">Save</Button>]}
                  trigger={
                    <Button waves="light" className="btn-save right"><Icon>edit</Icon> </Button>
  }
                >
                  <div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">person_pin</i>
                      <input
                        ref="username"
                        type="text"
                        className="validate"
                        defaultValue={this.props.user.username} 
                      />
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">perm_identity</i>
                      <input
                        ref="firstname"
                        type="text"
                        className="validate"
                        defaultValue={this.props.user.firstname}
                      />
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">perm_identity</i>
                      <input
                        ref="lastname"
                        type="text"
                        className="validate"
                        defaultValue={this.props.user.lastname}
                      />
                    </div>
                    <div className="input-field col s6">
                      <i className="material-icons prefix">assignment_ind</i>
                      <input
                        ref="email"
                        type="text"
                        className="validate"
                        disabled
                        defaultValue={this.props.user.email}
                      />
                    </div>
                  </div>
                </Modal>

                <div style={{ float: 'right' }}> <Dialog header="Delete User" message="Are you sure you want to delete this user?" action="DELETE" onContinue={this.handleUserDelete} /> </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}


ViewUsers.propTypes = {
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});


const mapDispatchToProps = {
  editUser,
  deleteUser
};


export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);

