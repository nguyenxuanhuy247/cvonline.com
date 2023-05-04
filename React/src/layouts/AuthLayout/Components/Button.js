import { Component } from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
const cx = className.bind(styles);

export class SwitchButton extends Component {
    render() {
        const { question, to, button } = this.props;
        return (
            <div className={cx('switch')}>
                <p className={cx('switch-question')}>{question}</p>
                <Link to={to} className={cx('button')}>
                    {button}
                </Link>
            </div>
        );
    }
}

export class SubmitButton extends Component {
    render() {
        const { text } = this.props;
        return (
            <button type="submit" className={cx('form-submit')}>
                {text}
            </button>
        );
    }
}

