import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Button from '~/components/Button/Button.js';
import { ImageWithRef } from '~/components/Image/Image.js';
import styles from './LibraryList.module.scss';

const cx = classnames.bind(styles);
class LibraryList extends PureComponent {
    render() {
        return (
            <div>
                {this.props.data &&
                    this.props.data.map((lib) => {
                        return (
                            <Button key={lib.id} className={cx('button')} isEdit>
                                <ImageWithRef src={lib.icon} className={cx('image-icon')} />
                                <span className={cx('name')}>{lib.name}</span>
                                <span className={cx('version')}>{lib.version}</span>
                            </Button>
                        );
                    })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);
