import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    route,
    url,
    disabled = false,
    children,
    buttonClass,
    leftIconClass,
    childrenClass,
    rightIconClass,
    leftIcon,
    rightIcon,
    onClick,
    forwardRef,
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
    const classes = cx('button', {
        [buttonClass]: buttonClass,
        disabled,
    });
    return (
        <Component className={classes} {...props} ref={forwardRef}>
            {leftIcon && <span className={cx('left-icon', leftIconClass)}>{leftIcon}</span>}
            {children && <span className={cx('text', childrenClass)}>{children}</span>}
            {rightIcon && <span className={cx('right-icon', rightIconClass)}>{rightIcon}</span>}
        </Component>
    );
}

export default forwardRef((props, ref) => <Button {...props} forwardRef={ref}/>)