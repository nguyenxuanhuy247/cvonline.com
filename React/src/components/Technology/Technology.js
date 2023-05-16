import { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './Technology.module.scss';
import { ImageWithRef } from '~/components/Image/Image.js';
import Button from '~/components/Button/Button.js';

const cx = classNames.bind(styles);

export default class Technology extends Component {
    static propTypes = {
        to: PropTypes.string,
        href: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string,
    };

    render() {
        const { data } = this.props;
        return (
            data &&
            data.map((item) => {
                return (
                    <Button key={item.id} className={cx('button')} isEdit>
                        <ImageWithRef src={item.src} alt={item.name} className={cx('image')} />
                        <span className={cx('name')}>{item.name}</span>
                    </Button>
                );
            })
        );
    }
}
