import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ReactSortable } from 'react-sortablejs';

import * as userActions from '~/store/actions';
import styles from './TechnologyList.module.scss';
import Button from '~/components/Button/Button.js';
import Technology from '~/layouts/PersonalLayout/Components/Technology.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = classnames.bind(styles);

class TechnologyList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.technologyList || [],
        };
    }

    // =================================================================
    // Show / Hide Create Technology container

    handleShowCreateTechnology = async () => {
        await this.setState({ isCreateTechnology: true });

        const autofocusInputElement = document.getElementById(`js-autofocus-input-${this.props.type}`);
        autofocusInputElement.focus();
    };

    handleCloseCreateTechnology = () => {
        this.setState({ isCreateTechnology: false });
    };

    // =================================================================

    // =================================================================
    // CRUD TECHNOLOGY

    handleCreateTechnology = async (data) => {
        const { id: userId } = this.props?.user ?? {};
        const newData = {
            ...data,
            userId: userId,
        };

        const errorCode = await this.props.createTechnology(newData);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);

            if (errorCode === 0) {
                return errorCode;
            }
        }
    };

    handleUpdateTechnology = async (data) => {
        const { id: userId } = this.props?.user ?? {};
        const newData = {
            ...data,
            userId: userId,
        };

        const errorCode = await this.props.updateTechnology(newData);

        if (errorCode === 0) {
            const errorCode = await this.props.readProductList(userId);

            if (errorCode === 0) {
                return errorCode;
            }
        }
    };

    handleDeleteTechnology = async (technologyId, label) => {
        const { id: userId } = this.props?.user ?? {};

        const errorCode = await this.props.deleteTechnology(technologyId, label);
        if (errorCode === 0) {
            await this.props.readProductList(userId);
        }
    };

    handleSortList = (newState) => {
        this.setState({ list: newState });
    };

    render() {
        const { draggable, type, keyprop, side, productId, label, index, isSearch, onSearchLibrary } = this.props;

        return (
            <div
                className={cx('technology-list', {
                    'sourcecode-list': type === 'SOURCECODE',
                })}
            >
                <ReactSortable
                    multiDrag
                    list={this.state.list}
                    setList={(newState) => this.handleSortList(newState)}
                    id={this.props.technologyListID}
                    className={cx('technology-list-inner', {
                        'library-list': type === 'LIBRARY',
                    })}
                    chosenClass={cx('dragging-item')}
                    animation={150}
                >
                    {this.state.list?.map((technology) => {
                        return (
                            <Technology
                                key={technology.id}
                                // =================================================================
                                draggable={draggable}
                                librarylist={this.state.list}
                                // Common info
                                side={side}
                                label={label}
                                productId={productId}
                                keyprop={keyprop}
                                // Technology info
                                id={technology?.id}
                                type={type}
                                src={technology?.image}
                                name={technology?.name}
                                version={technology?.version}
                                href={technology?.link}
                                // =================================================================
                                // Show and Hide Create Technology Container
                                isCloseEditTechnology={this.state.isCreateTechnology}
                                onShowCreateTechnology={this.handleShowCreateTechnology}
                                onCloseCreateTechnology={this.handleCloseCreateTechnology}
                                // =================================================================
                                // CRUD
                                onUpdateTechnology={this.props.onUpdateTechnology}
                                onDeleteTechnology={this.props.onDeleteTechnology}
                            />
                        );
                    })}
                </ReactSortable>

                {!this.state.isCreateTechnology ? (
                    <Button
                        className={cx('add-technology-button', {
                            'sourcecode-list': type === 'SOURCECODE',
                        })}
                        onClick={() => this.handleShowCreateTechnology()}
                    >
                        <span className={cx('left-icon')}>
                            <BsPlusCircleDotted />
                        </span>
                        <span className={cx('text')}>{`Thêm ${label}`}</span>
                    </Button>
                ) : (
                    <CreateEditTechnology
                        id={`${this.props.technologyListID}-create-container`}
                        index={index}
                        label={label}
                        type={type}
                        keyprop={keyprop}
                        side={side}
                        productId={productId}
                        onCloseCreateTechnology={this.handleCloseCreateTechnology}
                        onCreateTechnology={this.props.onCreateTechnology}
                        isSearch={isSearch}
                        onSearchLibrary={onSearchLibrary}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        createTechnology: (data) => dispatch(userActions.createTechnology(data)),
        readTechnology: (data) => dispatch(userActions.readTechnology(data)),
        updateTechnology: (data) => dispatch(userActions.updateTechnology(data)),
        deleteTechnology: (technologyId, label) => dispatch(userActions.deleteTechnology(technologyId, label)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologyList);
