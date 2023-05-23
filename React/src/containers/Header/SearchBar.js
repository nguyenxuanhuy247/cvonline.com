import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { BsKeyboard } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { FaMicrophone } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import DefaultTippy from '@tippyjs/react';

import styles from './SearchBar.module.scss';
import Button from '~/components/Button/Button.js';
const cx = classnames.bind(styles);

class SearchBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { searchValue: '', loading: false };
    }

    inputRef = React.createRef();

    handleInputValue = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    render() {
        const { searchValue } = this.state;
        return (
            <div className={cx('container')}>
                <div className={cx('search-bar')}>
                    <input
                        className={cx('search-input')}
                        ref={this.inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onInput={(e) => this.handleInputValue(e)}
                    />
                    <Button className={cx('keyboard')}>
                        <BsKeyboard />
                    </Button>
                    <Button className={cx('close')}>
                        <GrClose />
                    </Button>

                    <DefaultTippy content="Tìm kiếm" arrow="">
                        <Button className={cx('magnify')}>
                            <FiSearch />
                        </Button>
                    </DefaultTippy>
                </div>
                <DefaultTippy content="Tìm kiếm bằng giọng nói" arrow="">
                    <Button className={cx('micro-button')}>
                        <FaMicrophone />
                    </Button>
                </DefaultTippy>
            </div>
        );
    }
}

export default SearchBar;
