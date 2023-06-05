import { Component } from 'react';
import className from 'classnames/bind';
import _ from 'lodash';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './CustomTooltip.module.scss';

const cx = className.bind(styles);

export class DefaultTippy extends Component {
    render() {
        let { children, content } = this.props;
        return <Tippy content={content}>{children}</Tippy>;
    }
}

export class HeadlessTippy extends Component {
    render() {
        let { children, content } = this.props;

        return (
            <TippyHeadless
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        {content}
                    </div>
                )}
                delay={[0, 100000]}
                interactive
            >
                {children}
            </TippyHeadless>
        );
    }
}
