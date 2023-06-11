import { PureComponent } from 'react';
import className from 'classnames/bind';
import PropTypes from 'prop-types';
import { RiDragMove2Fill } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { TfiPencil } from 'react-icons/tfi';
import DefaultTippy from '@tippyjs/react';

import styles from './EditButton.module.scss';
import Button from './Button';

const cx = className.bind(styles);

class EditButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static propTypes = {
        onAdd: PropTypes.func,
        onEdit: PropTypes.func,
        onDelete: PropTypes.func,
    };

    handleMouseEnter = () => {
        const hoverButton = document.getElementById(`${this.props.id}`);
        if (hoverButton) {
            hoverButton.style.backgroundColor = 'rgba(65, 188, 138, 0.1)';
        }
    };

    handleMouseLeave = () => {
        const hoverButton = document.getElementById(this.props.id);
        if (hoverButton) {
            hoverButton.style.backgroundColor = 'transparent';
        }
    };

    render() {
        const { onAdd, onEdit, onDelete } = this.props;

        return (
            <div
                className={cx('wrapper')}
                onMouseEnter={() => this.handleMouseEnter()}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                <DefaultTippy content="Kéo thả để di chuyển mục">
                    <Button className={cx('btn', 'drag')}>
                        <RiDragMove2Fill />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Thêm mục mới">
                    <Button className={cx('btn', 'add')} onClick={onAdd}>
                        <IoIosAddCircleOutline />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Sửa mục này">
                    <Button className={cx('btn', 'add')} onClick={onEdit}>
                        <TfiPencil />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Xóa mục này">
                    <Button className={cx('btn', 'delete')} onClick={onDelete}>
                        <AiOutlineDelete />
                    </Button>
                </DefaultTippy>
            </div>
        );
    }
}

export default EditButton;
