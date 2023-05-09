import React, { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './JobTitle.module.scss';
import * as userCVActions from '~/store/actions';

const cx = className.bind(styles);

class JobTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.jobTitle,
        };

        this.myRef = React.createRef();
    }

    hanleChangeContext() {
        this.setState({ text: this.myRef.current.innerText });
    }

    componentWillUnmount() {
        this.props.changeJobTitle(this.state.text);
    }

    render = () => {
        // console.log(this.state.text);
        return (
            <span
                className={cx('job-title')}
                ref={this.myRef}
                dangerouslySetInnerHTML={{ __html: this.props.jobTitle }}
                contentEditable
                suppressContentEditableWarning
                onInput={() => this.hanleChangeContext()}
                data-placeholder="VD: Fullstack developer"
                spellCheck="false"
            ></span>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        jobTitle: state.userCV.jobTitle,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeJobTitle: (data) => dispatch(userCVActions.userChangeJobTitle(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobTitle);
