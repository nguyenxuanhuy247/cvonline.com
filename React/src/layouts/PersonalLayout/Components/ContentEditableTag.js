import React, { PureComponent } from 'react';

class ContentEditableTag extends PureComponent {
    render = () => {
        const { className = '', placeholder = 'Vui lòng nhập trường này' } = this.props;

        return (
            <div
                className={`${className}`}
                style={{ padding: '0.1em 0.4em' }}
                ref={this.ref}
                contentEditable
                suppressContentEditableWarning
                placeholder={placeholder}
                spellCheck="false"
                tabIndex="0"
            ></div>
        );
    };
}

export default ContentEditableTag;
