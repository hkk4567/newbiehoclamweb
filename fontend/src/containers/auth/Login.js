import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginAPI} from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isShowPassword: false,
            errMsg: ''
        }
    }

    handleLogin = async () => {
        this.setState({
            errMsg: ''
        });

        try {
           let data = await handleLoginAPI(this.state.email, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({ errMsg: data.errMsg });
            } 
            if (data && data.errcode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success');
            }   
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMsg: error.response.data.message
                    });
                }
            }
        }
    }

    handleShowPasswordChange = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    render() {
        return (
            <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                <div className="card card0 border-0">
                    <div className="row d-flex">
                        <div className="col-lg-6">
                            <div className="card1 pb-5">
                                <div className="row">
                                    <img src="https://i.imgur.com/CXQmsmF.png" className="logo" alt="Logo" />
                                </div>
                                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                    <img src="https://i.imgur.com/uNGdWHi.png" className="image" alt="Display" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card2 card border-0 px-4 py-5">
                                <div className="row mb-4 px-3">
                                    <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                    <div className="facebook text-center mr-3"><i className="fab fa-facebook"></i> </div>
                                    <div className="twitter text-center mr-3"><i className="fab fa-twitter"></i></div>
                                    <div className="linkedin text-center mr-3"><i className="fab fa-linkedin"></i></div>
                                </div>
                                <div className="row px-3 mb-4">
                                    <div className="line"></div>
                                    <small className="or text-center">Or</small>
                                    <div className="line"></div>
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1"><h6 className="mb-0 text-sm">Email Address</h6></label>
                                    <div>
                                        <input 
                                            className="mb-4" 
                                            type="text" 
                                            name="email"
                                            placeholder="Enter a valid email address" 
                                            value={this.state.email}
                                            onChange={e => this.setState({ email: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row px-3">
                                    <label className="mb-1"><h6 className="mb-0 text-sm">Password</h6></label>
                                    <div className="custom-input">
                                        <input 
                                            type={this.state.isShowPassword? 'text' : 'password'} 
                                            name="password" 
                                            placeholder="Enter password" 
                                            value={this.state.password}
                                            onChange={e => this.setState({ password: e.target.value })}
                                        />
                                        <span
                                            onClick={() => this.handleShowPasswordChange()}
                                        ><i className={this.state.isShowPassword? "fa fa-eye-slash icon-custom" : "fa fa-eye icon-custom"}></i></span>
                                    </div>
                                    <div>
                                        <p className="text-danger">{this.state.errMsg}</p>
                                    </div>
                                </div>
                                <div className="row px-3 mb-4 space-between">
                                    <div className="custom-control custom-checkbox custom-control-inline flex width-auto">
                                        <input id="chk1" type="checkbox" name="chk" className="custom-control-input" /> 
                                        <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label>
                                    </div>
                                    <a href="#" className="ml-auto mb-0 text-sm width-auto">Forgot Password?</a>
                                </div>
                                <div className="row mb-3 px-3">
                                    <button className="btn btn-blue text-center" onClick={() => this.handleLogin()}>Login</button>
                                </div>
                                <div className="row mb-4 px-3">
                                    <small className="font-weight-bold">Don't have an account? <a className="text-danger">Register</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue py-4">
                        <div className="row px-3">
                            <small className="ml-4 ml-sm-5 mb-2">Copyright &copy; 2019. All rights reserved.</small>
                            <div className="social-contact ml-4 ml-sm-auto">
                                <span className="fa fa-facebook mr-4 text-sm"></span>
                                <span className="fa fa-google-plus mr-4 text-sm"></span>
                                <span className="fa fa-linkedin mr-4 text-sm"></span>
                                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
