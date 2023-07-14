import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ReactSortable } from 'react-sortablejs';

import styles from './TechnologyList.module.scss';
import Button from '~/components/Button/Button.js';
import Technology from '~/layouts/PersonalLayout/Components/Technology.js';
import CreateEditTechnology from '~/layouts/PersonalLayout/Components/CreateEditTechnology.js';

const cx = className.bind(styles);

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

    render() {
        const { draggable, type, keyprop, side, productId, label, technologyList, isSearch, onSearchLibrary } =
            this.props;
        console.log('list ', this.state.list);
        return (
            <div
                className={cx('technology-list', {
                    'sourcecode-list': type === 'SOURCECODE',
                })}
            >
                <ReactSortable
                    multiDrag
                    list={this.state.list}
                    setList={(newState) => this.setState({ list: newState })}
                    id={this.props.technologyListID}
                    className={cx('technology-list-inner', {
                        'library-list': type === 'LIBRARY',
                    })}
                    chosenClass={cx('dragging-item')}
                >
                    {this.state.list?.map((technology) => {
                        return (
                            <Technology
                                key={technology.id}
                                // =================================================================
                                draggable={draggable}
                                librarylist={technologyList}
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

export default TechnologyList;
