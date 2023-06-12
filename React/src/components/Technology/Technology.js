import { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Technology.module.scss';
import Image from '~/components/Image/Image.js';
import Button from '~/components/Button/Button.js';

const cx = classNames.bind(styles);

class Technology extends Component {
    constructor(props) {
        super(props);
        this.state = { list: this.props.data || [], dragItemIndex: null, dragOverItemIndex: null };
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

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ list: this.props.data });
        }
    }

    render() {
        const { list } = this.state;
        const { isEdit, draggable } = this.props;

        const props = {
            isEdit,
            draggable,
        };

        return (
            list &&
            list?.map((item, index) => {
                return (
                    <Button
                        key={index}
                        className={cx('button')}
                        {...props}
                        onDragStart={() => this.handleDragStart(index)}
                        onDragEnter={() => this.handleDragEnter(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => this.handleSort()}
                    >
                        <Image src={item.src} alt={item.name} className={cx('image')} />
                        <span className={cx('name')}>{item.name}</span>
                    </Button>
                );
            })
        );
    }
}

export default Technology;
