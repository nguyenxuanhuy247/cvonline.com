import { Component } from 'react';
import { connect } from 'react-redux';
import className from 'classnames/bind';
import { Switch, Route } from 'react-router-dom';
import _ from 'lodash';

import styles from './Auth.module.scss';
import SignIn from './Components/Signin.js';
import SignUp from './Components/Signup.js';
import CarouselTag from './Components/Carousel.js';
import { path } from '~/utils';

const cx = className.bind(styles);

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={'container-fluid px-0'}>
                <div className={cx('wrapper')}>
                    <div className={`col-6 ${cx('col-left')}`}>
                        <CarouselTag />
                    </div>

                    <div className={`col-6 ${cx('col-right')}`}>
                        <Switch>
                            <Route path={path.SIGNIN} component={SignIn} />
                            <Route path={path.SIGNUP} component={SignUp} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignUp: state.user.isSignUp,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);