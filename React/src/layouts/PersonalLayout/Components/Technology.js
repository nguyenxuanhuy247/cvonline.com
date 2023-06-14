import { PureComponent } from 'react';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Button from '~/components/Button/Button.js';
import styles from './Technology.module.scss';
import Image from '~/components/Image/Image.js';
import EditButton from '~/components/Button/EditButton';
import { JpgImages } from '~/components/Image/Images.js';
import Loading from '~/components/Modal/Loading.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = classnames.bind(styles);

class Technology extends PureComponent {
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

    getParent = (element, selector) => {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    };

    handleShowEditTechnology = (id) => {
        const item = document.getElementById(`js-technology-item-${id}`);
        const parentEL = this.getParent(item, '#js-technology-item');

        if (parentEL) {
            parentEL.style.width = '100%';
        }

        let selectedtechnology;
        const technologyList = this.props.technologyList;

        if (technologyList) {
            selectedtechnology = technologyList.find((technology) => {
                return technology.id === id;
            });
        }

        this.setState({
            isEdit: true,
            id: selectedtechnology.id,
            image: selectedtechnology.image,
            name: selectedtechnology.name,
            version: selectedtechnology.version,
            link: selectedtechnology.link,
        });
    };

    handleCloseEditTechnology = () => {
        const item = document.querySelector(`.${cx('edit-technology')}`);
        const parentEL = this.getParent(item, '#js-technology-item');
        console.log(' isEdit state:', this.state.isEdit);

        if (parentEL) {
            parentEL.style.width = 'auto';
        }

        this.setState({ isEdit: false }, () => console.log(' isEdit state:', this.state.isEdit));
    };

    render() {
        const {
            draggable = false,
            href = '',
            id = undefined,
            src = '',
            name = '',
            isLoading = false,
            onShow,
            onUpdate,
            onDelete,
            errorCode,
        } = this.props;

        return !this.state.isEdit ? (
            <HeadlessTippy
                placement="top-start"
                interactive
                offset={[0, 0]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <EditButton
                            onShow={onShow}
                            onEdit={() => this.handleShowEditTechnology(id)}
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
                    <Button id={`js-technology-item-${id}`} className={cx('button')} {...this.props}>
                        <Image src={src || JpgImages.placeholder} className={cx('image')} />
                        <span className={cx('name')}>{name}</span>
                    </Button>
                </HeadlessTippy>
            </HeadlessTippy>
        ) : (
            <div style={{ position: 'relative' }} className={cx('edit-technology-wrapper')}>
                <CreateEditTechnology
                    className={cx('edit-technology')}
                    isEdit
                    data={this.state}
                    technology="thư viện"
                    onClose={() => this.handleCloseEditTechnology()}
                    onUpdate={onUpdate}
                    errorCode={errorCode}
                />
                {isLoading && <Loading style={{ position: 'absolute' }} />}
            </div>
        );
    }
}

export default Technology;
