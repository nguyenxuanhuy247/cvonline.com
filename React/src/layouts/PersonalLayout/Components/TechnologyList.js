import { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './TechnologyList.module.scss';
import Image from '~/components/Image/Image.js';
import Button from '~/components/Button/Button.js';
import { TechnologyProvider } from '~/components/Context/Context.js';
import EditButton from '~/components/Button/EditButton';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = classNames.bind(styles);

class TechnologyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCreate: false,
            list: this.props.data || [],
            dragItemIndex: null,
            dragOverItemIndex: null,
        };
    }

    static propTypes = {
        data: PropTypes.array,
        edit: PropTypes.bool,
        draggable: PropTypes.bool,
    };

    handleDragStart = (index) => {
        console.log('Drag item : ', index);
        this.setState({ dragItemIndex: index });
    };

    handleDragEnter = (index) => {
        console.log('Drag Over item : ', index);
        this.setState({ dragOverItemIndex: index });
    };

    handleSort = () => {
        const copyList = [...this.state.list];
        const dragItem = copyList.splice(this.state.dragItemIndex, 1);
        copyList.splice(this.state.dragOverItemIndex, 0, ...dragItem);
        this.setState({ list: copyList, dragItemIndex: null, dragOverItemIndex: null });
    };

    handleShowCreateOrEditTechnology = (action) => {
        let state;
        if (action === 'create') {
            state = 'isOpenCreate';
        } else {
            state = 'isOpenEdit';
        }

        this.setState({ [state]: true });
    };

    handleCloseCreateOrEditTechnology = (action) => {
        let state;
        if (action === 'create') {
            state = 'isOpenCreate';
        } else {
            state = 'isOpenEdit';
        }

        this.setState({ [state]: false });
    };

    handleCreateTechnology = async (state) => {
        let uniqueData;
        if (this.props.technology === 'framework') {
            uniqueData = {
                type: 'FRAMEWORK',
                key: 'FW',
            };
        }

        const data = {
            ...uniqueData,
            image: state.image,
            name: state.name,
            version: state.version,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.createLibrary(data);

        if (this.errorCode.current === 0) {
            if (this.state.isPagination) {
                await this.props.readLibrary(this.side(), this.lastPage.current, this.state.itemsPerPage);
                await this.props.readLibrary(this.side(), this.lastPage.current, this.state.itemsPerPage);
                await this.setState({
                    isAddLibrary: false,
                    selectedPage: this.lastPage.current,
                    image: '',
                    name: '',
                    version: '',
                    link: '',
                });
            } else {
                await this.props.readLibrary(this.side());
            }

            this.errorCode.current = null;
        }
    };

    handleDeleteTechnology = async (id) => {
        await this.props.onDelete(id, 'FW');
        await this.props.onRead();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ list: this.props.data });
        }
    }

    render() {
        const { isOpenCreate, list } = this.state;
        const { draggable, technology } = this.props;

        return (
            <div className={cx('technology-container')}>
                {list?.map((technology, index) => (
                    <TechnologyProvider
                        key={index}
                        value={{
                            onAdd: () => this.handleShowCreateOrEditTechnology('create'),
                            onDelete: () => this.handleDeleteTechnology(technology.id),
                        }}
                    >
                        <div style={{ display: 'inline-block' }}>
                            <HeadlessTippy
                                placement="top-start"
                                interactive
                                offset={[0, 0]}
                                render={(attrs) => (
                                    <div tabIndex="-1" {...attrs}>
                                        <EditButton onEdit={() => this.handleShowEditLibrary(technology.id)} />
                                    </div>
                                )}
                            >
                                <Button
                                    className={cx('button')}
                                    draggable={draggable}
                                    onDragStart={() => this.handleDragStart(index)}
                                    onDragEnter={() => this.handleDragEnter(index)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => this.handleSort()}
                                >
                                    <Image src={technology.src} alt={technology.name} className={cx('image')} />
                                    <span className={cx('name')}>{technology.name}</span>
                                </Button>
                            </HeadlessTippy>
                        </div>
                    </TechnologyProvider>
                ))}

                {isOpenCreate && (
                    <CreateEditTechnology
                        className={cx('create-edit-technology')}
                        technology={technology}
                        isEdit={false}
                        onShow={() => this.handleShowCreateOrEditTechnology('create')}
                        onClose={() => this.handleCloseCreateOrEditTechnology('create')}
                    />
                )}
            </div>
        );
    }
}

export default TechnologyList;
