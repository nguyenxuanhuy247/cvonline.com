import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import { FaBell } from 'react-icons/fa';
import DefaultTippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function Button({
    route,
    url,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    buttonClass,
    childrenClass,
    leftIcon,
    rightIcon,
    onClick,
    ref,
    ...passProps
}) {
    const props = {
        onClick,
        ...passProps,
    };

    // By default, Button component is a button
    let Component = 'button';

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
        Component = Link;
    } else if (url) {
        props.href = url;
        Component = 'a';
    }

    // Custom class
    const classes = cx('wrapper', {
        [buttonClass]: buttonClass,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });

    return (
        <Component className={classes} {...props} ref={ref}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('text', childrenClass)}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
}

export default Button;
