import { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button/Button.js';
import styles from './Library.module.scss';
import Image from '~/components/Image/Image.js';
import EditButton from '~/components/Button/EditButton';

const cx = classnames.bind(styles);

class Library extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        };
    }

    handleEditLibrary = () => {
        this.setState({ isEdit: true });
    };

    handleUpdateLibrary = () => {};

    render() {
        const { onAdd, href, src, name, version } = this.props;

        return !this.state.isEdit ? (
            <HeadlessTippy
                placement="top-start"
                interactive
                offset={[0, 0]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <EditButton onAdd={onAdd} onEdit={this.handleEditLibrary} />
                    </div>
                )}
            >
                <Button href={href} className={cx('button')}>
                    <Image src={src} className={cx('image')} />
                    <span className={cx('name')}>{name}</span>
                    <span className={cx('version')}>{version}</span>
                </Button>
            </HeadlessTippy>
        ) : (
            <div className={cx('add-library')}>
                <div className={cx('info')}>
                    <p className={cx('heading')}>Chỉnh sửa thư viện</p>
                    <div className={cx('img-wrapper')}>
                        <Image className={cx('image')} round />
                    </div>
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập tên thư viện"
                        value={this.state.libraryName}
                        onChange={(e) => this.handleInputLibrary(e, 'libraryName')}
                    />
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập version"
                        value={this.state.libraryVersion}
                    />
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập link website (nếu có)"
                        value={this.state.libraryLink}
                    />
                </div>
                <div className={cx('actions')}>
                    <Button className={cx('btn', 'cancel')} onClick={() => this.setState({ isEdit: false })}>
                        Hủy
                    </Button>
                    <Button className={cx('btn', 'add')} onClick={() => this.handleUpdateLibrary()}>
                        Cập nhật
                    </Button>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Library);
