import React, { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';

import styles from './ContentEditableTag.module.scss';
import * as userCVActions from '~/store/actions';

const cx = className.bind(styles);

class ContentEditableTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
        };

        this.ref = React.createRef();
    }

    hanleChangeContent() {
        this.setState({ text: this.ref.current.innerText });
    }

    componentWillUnmount() {
        this.props.changeJobTitle(this.state.content);
    }

    render = () => {
        const {className = '', placeholder = 'Nhập trường này'} = this.props;
        return (
            <div
                className={cx('contenteditable-tag', className)}
                ref={this.ref}
                dangerouslySetInnerHTML={{ __html: this.props.jobTitle }}
                contentEditable
                suppressContentEditableWarning
                onInput={() => this.hanleChangeContent()}
                placeholder={placeholder}
                spellCheck="false"
            ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditableTag);
