import { Component } from "react";
import { connect } from "react-redux";

import "./Login.module.scss"

class Login extends Component {
    render() {
        return (
            <div className="login-background">
                Hello anh example
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
