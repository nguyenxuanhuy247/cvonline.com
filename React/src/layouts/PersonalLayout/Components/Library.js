import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button/Button.js';
import styles from './Library.module.scss';
import Image from '~/components/Image/Image.js';
import EditButton from '~/components/Button/EditButton';
import { JpgImages } from '~/components/Image/Images.js';
import Loading from '~/components/Modal/Loading.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

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
        let selectedLibrary;
        const libraryList = this.props.libraryList;

        if (libraryList) {
            selectedLibrary = libraryList.find((library) => {
                return library.id === id;
            });
        }

        this.setState({
            isEdit: true,
            id: selectedLibrary.id,
            image: selectedLibrary.image,
            name: selectedLibrary.name,
            version: selectedLibrary.version,
            link: selectedLibrary.link,
        });
    };

    handleCloseEditLibrary = () => {
        this.setState({ isEdit: false });
    };

    render() {
        const { draggable, href, id, src, name, version, isLoading, onShow, onUpdate, onDelete, errorCode } =
            this.props;

        console.log('Library :', draggable);
        return !this.state.isEdit ? (
            <HeadlessTippy
                placement="top-start"
                interactive
                offset={[0, 0]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <EditButton
                            id={`js-hover-button-${id}`}
                            onShow={onShow}
                            onEdit={() => this.handleShowEditLibrary(id)}
                            onDelete={onDelete}
                        />
                    </div>
                )}
            >
                <HeadlessTippy
                    placement="bottom"
                    offset={[0, 4]}
                    render={(attrs) => (
                        <div tabIndex="-1" {...attrs}>
                            {href && <div className={cx('library-href')}>{href}</div>}
                        </div>
                    )}
                >
                    <Button id={`js-hover-button-${id}`} className={cx('button')} {...this.props} draggable={draggable}>
                        <Image src={src || JpgImages.placeholder} className={cx('image')} />
                        <span className={cx('name')}>{name}</span>
                        <span className={cx('version')}>{version}</span>
                    </Button>
                </HeadlessTippy>
            </HeadlessTippy>
        ) : (
            <div style={{ position: 'relative' }}>
                <CreateEditTechnology
                    isEdit
                    data={this.state}
                    technology="thư viện"
                    onClose={this.handleCloseEditLibrary}
                    onUpdate={onUpdate}
                    errorCode={errorCode}
                />
                {isLoading && <Loading style={{ position: 'absolute' }} />}
            </div>
        );
    }
}

export default Library;
