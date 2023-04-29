import { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Technology.module.scss';
import { ImageIcon } from '~/components/Image/ImageIcon.js';

const cx = classNames.bind(styles);

export default class Technology extends Component {
    render() {
        let Comp = 'button';

        let button = {};
        if (this.props.to) {
            button.to = this.props.to;
            Comp = Link;
        } else if (this.props.href) {
            button.href = this.props.href;
            Comp = 'a';
        }

        return (
            <Comp className={cx('button')} {...button}>
                <ImageIcon src={this.props.src} alt={this.props.name} hover={cx('image')}/>
                <span className={cx('name')}>{this.props.name}</span>
            </Comp>
        );
    }
}
