import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import { FaUserPlus, FaUserEdit, FaUserMinus } from 'react-icons/fa';

import { getAllUsersFromServer, deleteUser } from '~/services';
import styles from './ManageUser.module.scss';
import ModalAddUser from './Modal/ManageUser/ModalAddUser.js';

const cx = className.bind(styles);

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            isOpenModalAddUser: false,
        };
    }

    handleOpenModalAddUser = () => {
        this.setState({ isOpenModalAddUser: true });
    };

    toggleModalAddUserFromParent = () => {
        this.setState({ isOpenModalAddUser: !this.state.isOpenModalAddUser });
    };

    getAllUsers = async () => {
        try {
            let users = await getAllUsersFromServer('ALL');
            console.log(users.data);
            if (users?.errorCode === 0) {
                this.setState({ allUsers: users.data });
            }
        } catch (error) {
            console.log('An error in getAllUsers() in ManageUser.js : ', error);
        }
    };

    handEditUser = (inputId) => {
        console.log(inputId);
    };

    handDeleteUser = async (inputId) => {
        console.log(inputId);
        try {
            let res = await deleteUser(inputId);

            if (res && res.errorCode === 0) {
                this.getAllUsers();
            } else if (res?.errorCode !== 0) {
                console.log(res.errorMessage);
            }
        } catch (error) {
            console.log('An error in handDeleteUser() in ManageUser.js : ', error);
        }
    };

    componentDidMount = async () => {
        await this.getAllUsers();
    };

    render() {
        let allUsers = this.state.allUsers;
        console.log('Re-render');
        return (
            <div className={cx('container')}>
                <ModalAddUser
                    isOpenModal={this.state.isOpenModalAddUser}
                    isToggle={this.toggleModalAddUserFromParent}
                />

                <h2 className={cx('title')}>SHOW ALL USER IN COMPANY</h2>
                <button className={cx('add-user-btn')} onClick={() => this.handleOpenModalAddUser()}>
                    <FaUserPlus className={cx('add-user-icon')} />
                    <p className={cx('add-user-text')}>Add a new user</p>
                </button>
                <table className={cx('table-users')}>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Title</th>
                            <th>Gender</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers &&
                            allUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.titleId}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <div className={cx('actions')}>
                                            <FaUserEdit
                                                className={cx('edit-user')}
                                                onClick={() => this.handEditUser(user.id)}
                                            />
                                            <FaUserMinus
                                                className={cx('delete-user')}
                                                onClick={() => this.handDeleteUser(user.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
