import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContentEditableTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '' || this.props.innerText,
        };
    }

    hanleChangeContent(e) {
        this.setState({ content: e.target.innerText });
    }

    componentWillUnmount() {}

    render = () => {
        const { className = '', placeholder = 'Vui lòng nhập trường này', onKeyDown } = this.props;
        console.log(onKeyDown);

        return (
            <div
                className={`${className}`}
                style={{ padding: '0.1em 0.4em' }}
                ref={this.ref}
                dangerouslySetInnerHTML={{ __html: this.state.content }}
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => this.hanleChangeContent(e)}
                placeholder={placeholder}
                spellCheck="false"
                tabIndex="0"
                onkeydown={() => {
                    onKeyDown(this.state.content);
                }}
            ></div>
        );
    };
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditableTag);
