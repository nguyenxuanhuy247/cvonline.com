import React, { PureComponent } from 'react';
import classnames from 'classnames/bind';
import { RiDragMove2Fill } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { TfiPencil } from 'react-icons/tfi';
import DefaultTippy from '@tippyjs/react';

import styles from './EditButton.module.scss';
import Button from './Button';

const cx = classnames.bind(styles);

class EditButton extends PureComponent {
    render() {
        const { editButtonID, onShowCreateTechnology, onShowEditTechnology, onDeleteTechnology } = this.props;

        return (
            <div
                id={editButtonID}
                className={cx('wrapper')}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
            >
                <DefaultTippy content="Kéo thả để di chuyển mục">
                    <Button draggable className={cx('btn', 'drag')}>
                        <RiDragMove2Fill />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Thêm mục mới">
                    <Button className={cx('btn', 'add')} onClick={onShowCreateTechnology}>
                        <IoIosAddCircleOutline />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Sửa mục này">
                    <Button className={cx('btn', 'edit')} onClick={onShowEditTechnology}>
                        <TfiPencil />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Xóa mục này">
                    <Button className={cx('btn', 'delete')} onClick={onDeleteTechnology}>
                        <AiOutlineDelete />
                    </Button>
                </DefaultTippy>
            </div>
        );
    }
}

export default EditButton;
