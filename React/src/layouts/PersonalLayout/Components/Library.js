import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button/Button.js';
import styles from './Library.module.scss';
import Image from '~/components/Image/Image.js';
import EditButton from '~/components/Button/EditButton';
import { JpgImages } from '~/components/Image/Images.js';

const cx = classnames.bind(styles);

class Library extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            id: undefined,
            image: '',
            name: '',
            version: '',
            link: '',
        };
    }

    handleShowEditLibrary = (id) => {
        let editedLibrary;
        const libraryList = this.props.libraryList;
        if (libraryList) {
            editedLibrary = libraryList.find((library) => {
                return library.id === id;
            });
        }

        this.setState({
            isEdit: true,
            id: editedLibrary.id,
            image: editedLibrary.image,
            name: editedLibrary.name,
            version: editedLibrary.version,
            link: editedLibrary.link,
        });
    };

    handleEditLibrary = (e, state) => {
        const value = e.target.value;
        this.setState({ [state]: value });
    };

    handleUpdateLibrary = () => {
        const data = {
            image: this.state.image,
            name: this.state.name,
            version: this.state.version,
            link: this.state.link,
        };
        this.props.updateLibrary(data, this);
    };

    render() {
        const { onAdd, onUpdate, onDelete, href, id, src, name, version } = this.props;

        return !this.state.isEdit ? (
            <HeadlessTippy
                placement="top-start"
                interactive
                offset={[0, 0]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <EditButton onAdd={onAdd} onEdit={() => this.handleShowEditLibrary(id)} onDelete={onDelete} />
                    </div>
                )}
            >
                <Button href={href} className={cx('button')}>
                    <Image src={src || JpgImages.placeholder} className={cx('image')} />
                    <span className={cx('name')}>{name}</span>
                    <span className={cx('version')}>{version}</span>
                </Button>
            </HeadlessTippy>
        ) : (
            <div className={cx('add-library')}>
                <div className={cx('info')}>
                    <p className={cx('heading')}>Chỉnh sửa thư viện</p>
                    <div className={cx('img-wrapper')}>
                        <HeadlessTippy
                            zIndex="10"
                            placement="bottom"
                            interactive
                            delay={[0, 300]}
                            offset={[0, -30]}
                            render={(attrs) => (
                                <div tabIndex="-1" {...attrs}>
                                    <Button
                                        className={cx('edit-image-button')}
                                        onClick={() => this.setState({ isModalOpen: true })}
                                    >
                                        Sửa ảnh
                                    </Button>
                                </div>
                            )}
                        >
                            <Image className={cx('image')} round />
                        </HeadlessTippy>
                    </div>
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập tên thư viện"
                        value={this.state.name}
                        onChange={(e) => this.handleEditLibrary(e, 'name')}
                    />
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập version"
                        value={this.state.version}
                        onChange={(e) => this.handleEditLibrary(e, 'version')}
                    />
                    <input
                        type="text"
                        className={cx('input-form')}
                        placeholder="Nhập link website (nếu có)"
                        value={this.state.link}
                        onChange={(e) => this.handleEditLibrary(e, 'link')}
                    />
                </div>
                <div className={cx('actions')}>
                    <Button className={cx('btn', 'cancel')} onClick={() => this.setState({ isEdit: false })}>
                        Hủy
                    </Button>
                    <Button className={cx('btn', 'add')} onClick={() => onUpdate(this.state)}>
                        Cập nhật
                    </Button>
                </div>
            </div>
        );
    }
}

export default Library;
