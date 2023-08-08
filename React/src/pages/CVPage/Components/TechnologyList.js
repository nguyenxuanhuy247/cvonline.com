import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ReactSortable } from 'react-sortablejs';

import Button from '~/components/Button/Button.js';
import Technology from '~/pages/CVPage/Components/Technology.js';
import CreateEditTechnology from '~/pages/CVPage/Components/CreateEditTechnology.js';

import styles from './TechnologyList.module.scss';

const cx = classnames.bind(styles);

class TechnologyList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
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

    handleSortList = (newState) => {
        this.setState({ list: newState });
    };

    componentDidMount() {
        this.setState({ list: this.props.technologyList });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.technologyList !== this.props.technologyList) {
            this.setState({ list: this.props.technologyList });
        }
    }

    render() {
        const { draggable, type, keyprop, side, productId, label, isSearch, onSearchLibrary } = this.props;

        const { id: userID } = this.props?.userInfo ?? {};
        const { id: ownerID } = this.props?.owner ?? {};

        const isCanEdit = userID === ownerID;
        return (
            <div
                className={cx('technology-list', {
                    'sourcecode-list': type === 'SOURCECODE',
                })}
            >
                <ReactSortable
                    list={this.state.list}
                    setList={(newState) => this.handleSortList(newState)}
                    id={this.props.technologyListID}
                    className={cx('technology-list-inner', {
                        'sourcecode-list': type === 'SOURCECODE',
                        'technology-list': type === 'TECHNOLOGY',
                        'library-list': type === 'LIBRARY',
                    })}
                    animation={150}
                >
                    {this.state.list?.map((technology) => {
                        return (
                            <Technology
                                key={technology.id}
                                index={this.props.index}
                                // =================================================================
                                draggable={draggable}
                                librarylist={this.state.list}
                                // Common info
                                side={side}
                                label={label}
                                productId={productId}
                                keyprop={keyprop}
                                type={type}
                                // Technology info
                                id={technology?.id}
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
                                isSearch={isSearch}
                                onSearchLibrary={onSearchLibrary}
                            />
                        );
                    })}
                </ReactSortable>
                
                {isCanEdit &&
                    (!this.state.isCreateTechnology ? (
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
                            index={this.props.index}
                            label={label}
                            type={type}
                            keyprop={keyprop}
                            side={side}
                            productId={productId}
                            onClose={this.handleCloseCreateTechnology}
                            // =================================================================
                            isSearch={isSearch}
                            onSearchLibrary={onSearchLibrary}
                        />
                    ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        owner: state.user.owner,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TechnologyList);
