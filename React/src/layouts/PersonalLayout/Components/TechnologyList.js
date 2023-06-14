import React, { Component } from 'react';
import classnames from 'classnames/bind';

import styles from './TechnologyList.module.scss';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';
import Technology from '~/layouts/PersonalLayout/Components/Technology.js';

const cx = classnames.bind(styles);

class TechnologyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCreate: false,

            dragItemId: undefined,
            dragOverItemId: undefined,
        };

        this.errorCode = React.createRef();
        this.technologyState = React.createRef();
    }

    handleDragStart = (id) => {
        this.setState({ dragItemId: id }, () => console.log('Drag item : ', id));
    };

    handleDragEnter = (id) => {
        this.setState({ dragOverItemId: id }, () => console.log('Drag Over item : ', id));
    };

    handleSort = async () => {
        const dragItemData = this.props?.technologyList.find((technology) => technology.id === this.state.dragItemId);
        const dragOverItemData = this.props?.technologyList.find(
            (technology) => technology.id === this.state.dragOverItemId,
        );

        const dragItemChangeData = {
            type: this.props.type,
            key: this.props.keyTech,
            id: dragItemData.id,
            image: dragOverItemData.image,
            name: dragOverItemData.name,
            version: dragOverItemData.version,
            link: dragOverItemData.link,
        };

        const dragOverItemChangeData = {
            type: this.props.type,
            key: this.props.keyTech,
            id: dragOverItemData.id,
            image: dragItemData.image,
            name: dragItemData.name,
            version: dragItemData.version,
            link: dragItemData.link,
        };

        this.errorCode.current = null;
        await this.props.updateTechnology(dragItemChangeData);

        this.errorCode.current = null;
        await this.props.updateTechnology(dragOverItemChangeData);

        if (this.errorCode.current === 0) {
            await this.props.readTechnology();
            this.errorCode.current = null;
        }
    };

    handleShowCreateTechnology = () => {
        this.setState({ isShowCreate: true });
    };

    handleCloseCreateTechnology = () => {
        this.setState({ isShowCreate: false });
    };

    handleCreateTechnology = async (state) => {
        const data = {
            type: this.props.type,
            key: this.props.keyTech,
            image: state.image,
            name: state.name,
            version: state.version,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.createTechnology(data);

        if (this.errorCode.current === 0) {
            await this.props.readTechnology();
            await this.setState({
                isShowCreate: false,
                image: '',
                name: '',
                version: '',
                link: '',
            });

            this.errorCode.current = null;
        }
    };

    handleUpdateTechnology = async (state) => {
        const data = {
            type: this.props.type,
            key: this.props.keyTech,
            id: state.id,
            image: state.image,
            name: state.name,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.updateTechnology(data, true);

        if (this.errorCode.current === 0) {
            await this.technologyState.current?.handleCloseEditTechnology?.();
            await this.props.readTechnology();
            this.errorCode.current = null;
        }
    };

    handleDeleteTechnology = async (id) => {
        await this.props.onDelete(id, 'FW');
        await this.props.readTechnology();
    };

    componentDidUpdate(prevProps) {
        // Update errorCode when dispatch action
        if (prevProps.errorCode !== this.props.errorCode) {
            this.errorCode.current = this.props.errorCode;
        }
    }

    render() {
        const { draggable, technology, technologyList, isLoading = false } = this.props;

        let technologyListArray;
        if (Array.isArray(technologyList)) {
            technologyListArray = technologyList;
        } else {
            technologyListArray = [technologyList];
        }

        return (
            <div className={cx('technology-list')}>
                {technologyList &&
                    technologyListArray?.map((technology, index) => {
                        return (
                            <div key={index} id="js-technology-item">
                                <Technology
                                    draggable={draggable}
                                    technologyList={technologyListArray}
                                    id={technology?.id}
                                    src={technology?.image}
                                    name={technology?.name}
                                    href={technology?.link}
                                    onShow={() => this.handleShowCreateTechnology(technology?.id)}
                                    onUpdate={this.handleUpdateTechnology}
                                    isLoading={isLoading}
                                    errorCode={this.errorCode.current}
                                    ref={this.technologyState}
                                    // Drag and drop
                                    onDragStart={() => this.handleDragStart(technology?.id)}
                                    onDragEnter={() => this.handleDragEnter(technology?.id)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => this.handleSort()}
                                />
                            </div>
                        );
                    })}

                {this.state.isShowCreate && (
                    <CreateEditTechnology
                        className={cx('create-edit-technology')}
                        technology={technology}
                        isEdit={false}
                        onClose={() => this.handleCloseCreateTechnology()}
                        onCreate={this.handleCreateTechnology}
                    />
                )}
            </div>
        );
    }
}

export default TechnologyList;
