import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    route,
    href,
    disabled = false,
    children,
    className,
    onClick,
    ondragstart,
    ondragenter,
    ondragover,
    ondrop,
    ondrag,
    ondragend = () => {},
    onmouseenter,
    onmouseleave,
    forwardRef,
    ...passProps
}) {
    const props = {
        onClick: onClick,
        onDragStart: ondragstart,
        onDrag: ondrag,
        onDragEnter: ondragenter,
        onDragOver: ondragover,
        onDrop: ondrop,
        onDragEnd: ondragend,
        onMouseEnter: onmouseenter,
        onMouseLeave: onmouseleave,
        ...passProps,
    };

    // By default, Button component is a button
    let Button = 'button';

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    // Check whether Button Component is a tag or Link
    if (route) {
        props.to = route;
        Button = Link;
    } else if (href) {
        props.href = href;
        props.target = '_blank';
        props.rel = 'noopener';
        Button = 'a';
    }

    // Custom class
    const classes = cx('button', {
        [className]: className,
        disabled,
    });

    const handleDragEnd = async () => {
    };

    return (
        <Button className={classes} {...props} ref={forwardRef} onDragEnd={handleDragEnd}>
            {children}
        </Button>
    );
}

Button.propTypes = {
    route: PropTypes.string,
    url: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default forwardRef((props, ref) => <Button {...props} forwardRef={ref} />);
