import { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';

import { getAllUsersFromServer } from '~/services';
import styles from './ManageUser.module.scss';
const cx = className.bind(styles);

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
        };
    }

    getAllUsers = async () => {
        try {
            let users = await getAllUsersFromServer('ALL');
            console.log(users);
            if (users?.errorCode === 0) {
                this.setState({ allUsers: users.data });
            }
        } catch (error) {
            console.log('An error in getAllUsers() in ManageUser.js : ', error);
        }
    };

    componentDidMount = async () => {
        await this.getAllUsers();
    };

    render() {
        let allUsers = this.state.allUsers;
        console.log(allUsers);
        return (
            <div className={cx('container')}>
                <h2 className={cx('title')}>SHOW ALL USER IN COMPANY</h2>
                <button className={cx('add-user-btn')} >
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
                                    <td>{user.phonenumber}</td>
                                    <td>{user.address}</td>
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
