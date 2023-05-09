import React, { Component } from 'react';
import className from 'classnames/bind';
import { connect } from 'react-redux';
import TippyHeadless from '@tippyjs/react/headless';
import { BiArrowBack } from 'react-icons/bi';

import * as userActions from '~/store/actions/userActions.js';
import PopoverWrapper from '~/components/Popover/Wrapper.js';
import styles from './Menu.module.scss';
import Button from '~/components/Button/Button';

const cx = className.bind(styles);

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: this.props.data || [],
            isHeaderShow: false,
            subMenuHeaderTitle: '',
        };
    }

    handleShowMenuContent = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopoverWrapper className={cx('menu-wrapper')}>
                {this.state.isHeaderShow && (
                    <div className={cx('submenu-header')}>
                        <Button
                            buttonClass={cx('button-back')}
                            leftIconClass={cx('arrow-back')}
                            leftIcon={<BiArrowBack />}
                            onClick={() =>
                                this.setState({
                                    menuList: this.props.data,
                                    isHeaderShow: false,
                                })
                            }
                        />
                        <div className={cx('text')}>{this.state.subMenuHeaderTitle}</div>
                    </div>
                )}

                {this.state.menuList.length > 0 &&
                    this.state.menuList.map((item) => {
                        const isChildren = !!item.children;

                        return (
                            <Button
                                key={item.id}
                                buttonClass={cx('button')}
                                rightIconClass={cx('right-icon')}
                                leftIcon={item.leftIcon}
                                rightIcon={item.rightIcon}
                                onClick={() => {
                                    if (isChildren) {
                                        const { title, data } = item.children;
                                        this.setState({
                                            menuList: data,
                                            isHeaderShow: true,
                                            subMenuHeaderTitle: title,
                                        });
                                    }

                                    if (item.title === 'Đăng xuất') {
                                        this.props.userSignOut();
                                    }
                                }}
                            >
                                {item.title}
                            </Button>
                        );
                    })}
            </PopoverWrapper>
        </div>
    );

    render() {
        let { children } = this.props;

        return (
            <TippyHeadless
                interactive
                delay={[0, 100000]}
                hideOnClick
                placement="bottom-end"
                render={() => this.handleShowMenuContent()}
            >
                {children}
            </TippyHeadless>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        userSignOut: () => dispatch(userActions.userSignOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
