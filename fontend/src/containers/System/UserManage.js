import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arryUser: [],
        };
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arryUser: response.users,
            }, () => {
                console.log(this.state.arryUser);
            });
        }
    }


    render() {
        let arryUser = this.state.arryUser;
        return (
            <div className="text-container">
                <div className="title text-center">
                    Manage users
                </div>
                <div className="user-table mx-3 mt-2">
                    <table id="customers">
                        <tr>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            arryUser && arryUser.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.lastName}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'>Edit</button>
                                            <button className='btn-delete'>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
