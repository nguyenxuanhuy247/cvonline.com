import React, { PureComponent } from 'react';

class ContentEditableTag extends PureComponent {
    render = () => {
        const { content, className = '', placeholder = 'Vui lòng nhập trường này' } = this.props;

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
                onMouseEnter={(e) => e.target.focus()}
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        );
    };
}

export default ContentEditableTag;
