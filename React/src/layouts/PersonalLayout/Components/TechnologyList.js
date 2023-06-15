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
    }

    handleDragStart = (id) => {
        this.setState({ dragItemId: id });
    };

    handleDragEnter = (id) => {
        this.setState({ dragOverItemId: id });
    };

    handleSort = async () => {
        const dragItemData = this.props?.technologylist.find((technology) => technology.id === this.state.dragItemId);
        const dragOverItemData = this.props?.technologylist.find(
            (technology) => technology.id === this.state.dragOverItemId,
        );

        const dragItemChangeData = {
            type: this.props.type,
            key: this.props.keyprop,
            id: dragItemData.id,
            image: dragOverItemData.image,
            name: dragOverItemData.name,
            version: dragOverItemData.version,
            link: dragOverItemData.link,
        };

        const dragOverItemChangeData = {
            type: this.props.type,
            key: this.props.keyprop,
            id: dragOverItemData.id,
            image: dragItemData.image,
            name: dragItemData.name,
            version: dragItemData.version,
            link: dragItemData.link,
        };

        this.errorCode.current = null;
        await this.props.updatetechnology(dragItemChangeData);

        this.errorCode.current = null;
        await this.props.updatetechnology(dragOverItemChangeData);

        if (this.errorCode.current === 0) {
            await this.props.readtechnology();
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
            key: this.props.keyprop,
            image: state.image,
            name: state.name,
            version: state.version,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.createtechnology(data);

        if (this.errorCode.current === 0) {
            await this.props.readtechnology();
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

    handleUpdateTechnology = async (state, closeFn) => {
        const data = {
            type: this.props.type,
            key: this.props.keyprop,
            id: state.id,
            image: state.image,
            name: state.name,
            link: state.link,
        };

        this.errorCode.current = null;
        await this.props.updatetechnology(data, true);

        if (this.errorCode.current === 0) {
            await closeFn();
            await this.props.readtechnology();
            this.errorCode.current = null;
        }
    };

    handleDeleteTechnology = async (id) => {
        await this.props.ondelete(id, 'FW');
        await this.props.readtechnology();
    };

    componentDidUpdate(prevProps) {
        // Update errorCode when dispatch action
        if (prevProps.errorcode !== this.props.errorcode) {
            this.errorCode.current = this.props.errorcode;
        }
    }

    render() {
        const { draggable, technology, technologylist, isloading = false } = this.props;

        let technologyListArray;
        if (Array.isArray(technologylist)) {
            technologyListArray = technologylist;
        } else {
            technologyListArray = [technologylist];
        }

        return (
            <div className={cx('technology-list')}>
                {technologylist &&
                    technologyListArray?.map((technology, index) => {
                        return (
                            <div key={index} id="js-technology-item">
                                <Technology
                                    draggable={draggable}
                                    technologylist={technologyListArray}
                                    id={technology?.id}
                                    src={technology?.image}
                                    name={technology?.name}
                                    href={technology?.link}
                                    onshow={() => this.handleShowCreateTechnology(technology?.id)}
                                    onupdate={this.handleUpdateTechnology}
                                    isloading={isloading}
                                    errorcode={this.errorCode.current}
                                    // Drag and drop
                                    ondragstart={() => this.handleDragStart(technology?.id)}
                                    ondragenter={() => this.handleDragEnter(technology?.id)}
                                    ondragover={(e) => e.preventDefault()}
                                    ondrop={() => this.handleSort()}
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
