import React, { Component } from 'react';
import className from 'classnames/bind';
import TippyHeadless from '@tippyjs/react/headless';

import PopoverWrapper from '~/components/Popover/Wrapper.js';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem.js';

const cx = className.bind(styles);

const HeaderSubMenu = () => {
    return <div>Header</div>;
};

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: this.props.data || [],
        };
    }

    handleRenderMenuItem = () => {
        this.state.menuList.length > 0 &&
            this.state.menuList.map((item, index) => {
                const isParent = !!item.children;

                return (
                    <MenuItem
                        key={index}
                        data={item}
                        onClick={() => {
                            if (isParent) {
                                this.setState({ menuList: item.children.data });
                            }
                        }}
                    />
                );
            });
    };

    handleShowMenuContent = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopoverWrapper className={cx('menu-wrapper')}>{this.handleRenderMenuItem()}</PopoverWrapper>
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

export default Menu;
