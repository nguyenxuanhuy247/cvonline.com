import React, { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './ContentEditableTag.module.scss';
import * as userCVActions from '~/store/actions';

const cx = className.bind(styles);

class ContentEditableTag extends Component {
    constructor(props) {
        super(props);
        this.reduxState = this.props.reduxName;
        this.reduxDispatch = `change${this.props.reduxName}`;
        this.state = {
            content: this.props[this.reduxState],
        };

        this.ref = React.createRef();
    }

    hanleChangeContent() {
        this.setState({ content: this.ref.current.innerText });
    }

    componentWillUnmount() {
        if (this.props[this.reduxState] !== this.state.content) {
            this.props[this.reduxDispatch](this.state.content);
        }
    }

    render = () => {
        const { className = '', placeholder = 'Vui lòng nhập trường này' } = this.props;

        return (
            <div
                className={cx('contenteditable-tag', className)}
                ref={this.ref}
                dangerouslySetInnerHTML={{ __html: this.props[this.reduxState] }}
                contentEditable
                suppressContentEditableWarning
                onInput={() => this.hanleChangeContent()}
                placeholder={placeholder}
                spellCheck="false"
            ></div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    const { reduxName } = ownProps;
    // console.log(reduxName);
    return {
        [reduxName]: state[reduxName][reduxName],
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { reduxName } = ownProps;
    const reduxDispatch = `change${reduxName}`;

    return {
        [reduxDispatch]: (data) => dispatch(userCVActions[reduxDispatch](data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditableTag);
