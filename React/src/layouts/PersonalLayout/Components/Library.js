import React, { PureComponent } from 'react';
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
            image: undefined,
            name: undefined,
            version: undefined,
            link: undefined,
        };

        this.idTimeout = React.createRef();
    }

    handleShowEditLibrary = async (id) => {
        let selectedLibrary;
        const libraryList = this.props.librarylist;
        if (libraryList) {
            selectedLibrary = libraryList.find((library) => {
                return library.id === id;
            });
        }

        await this.setState({
            isEdit: true,
            id: selectedLibrary.id,
            image: selectedLibrary.image,
            name: selectedLibrary.name,
            version: selectedLibrary.version,
            link: selectedLibrary.link,
        });

        const editTechnologyContainer = document.getElementById(`js-edit-technology-container-${id}`);
        const editTechnology = document.getElementById(`js-edit-technology-${id}`);

        if (editTechnologyContainer && editTechnology && this.props.technology !== 'thư viện') {
            editTechnologyContainer.style.width = '100%';
            editTechnology.style.width = '80%';
            editTechnology.style.margin = '12px auto';
        }
    };

    handleCloseEditLibrary = () => {
        this.setState({ isEdit: false });
    };

    handleShowEditButton = (id) => {
        const item = document.getElementById(`js-edit-button-${id}`);
        item.style.visibility = 'visible';
    };

    handleHideEditButton = (id) => {
        const item = document.getElementById(`js-edit-button-${id}`);

        this.idTimeout.current = setTimeout(() => (item.style.visibility = 'hidden'), 0);
    };

    handleMouseHoverEditButton = () => {
        // Disable hide Edit button
        clearTimeout(this.idTimeout.current);
    };

    handleMouseUnHoverEditButton = (id) => {
        const item = document.getElementById(`js-edit-button-${id}`);
        if (item) {
            // Hide edit button
            item.style.visibility = 'hidden';
        }
    };

    componentWillUnmount() {
        clearTimeout(this.idTimeout.current);
    }

    render() {
        const {
            draggable,
            technology,
            type,
            href,
            id,
            src,
            name,
            version,
            isloading,
            onshow,
            onupdate,
            ondelete,
            ondragstart,
            ondragenter,
            ondragover,
            ondrop,
        } = this.props;

        const buttonProps = { draggable, href, ondragstart, ondragenter, ondragover, ondrop };

        return !this.state.isEdit ? (
            <HeadlessTippy
                placement="bottom"
                offset={[0, 4]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        {href && <div className={cx('library-href')}>{href}</div>}
                    </div>
                )}
            >
                <div
                    id={`js-button-container-${type}-${id}`}
                    style={{ position: 'relative', border: '2px solid transparent', borderRadius: '4px' }}
                >
                    <EditButton
                        id={`${type}-${id}`}
                        type={type}
                        onshow={onshow}
                        onedit={() => this.handleShowEditLibrary(id)}
                        ondelete={ondelete}
                        ondragstart={ondragstart}
                        ondrop={ondrop}
                        ondragenter={ondragenter}
                        onmouseenter={(e) => this.handleMouseHoverEditButton(e)}
                        onmouseleave={() => this.handleMouseUnHoverEditButton(`${type}-${id}`)}
                    />
                    <Button
                        id={`js-button-${type}-${id}`}
                        className={cx('button', { 'non-library-button': technology !== 'thư viện' })}
                        {...buttonProps}
                        onmouseenter={() => this.handleShowEditButton(`${type}-${id}`)}
                        onmouseleave={() => this.handleHideEditButton(`${type}-${id}`)}
                    >
                        {typeof src === 'string' && (
                            <Image src={src || JpgImages.placeholder} className={cx('image')} />
                        )}
                        {name && <span className={cx('name')}>{name}</span>}
                        {version && <span className={cx('version')}>{version}</span>}
                    </Button>
                </div>
            </HeadlessTippy>
        ) : (
            <div style={{ position: 'relative' }} id={`js-edit-technology-container-${id}`}>
                <CreateEditTechnology
                    id={`js-edit-technology-${id}`}
                    isedit
                    data={this.state}
                    technology={technology}
                    onclose={this.handleCloseEditLibrary}
                    onupdate={onupdate}
                />
                {isloading && <Loading style={{ position: 'absolute' }} />}
            </div>
        );
    }
}

export default Library;
