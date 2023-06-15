import React, { PureComponent } from 'react';
import className from 'classnames/bind';
import { RiDragMove2Fill } from 'react-icons/ri';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { TfiPencil } from 'react-icons/tfi';
import DefaultTippy from '@tippyjs/react';

import styles from './EditButton.module.scss';
import Button from './Button';

const cx = className.bind(styles);

class EditButton extends PureComponent {
    handleMouseEnter = (id) => {
        const hoverButton = document.getElementById(`js-button-${id}`);
        if (hoverButton) {
            hoverButton.style.backgroundColor = 'rgba(65, 188, 138, 0.1)';
        }

        this.props.onmouseenter();
    };

    handleMouseLeave = (id) => {
        const hoverButton = document.getElementById(`js-button-${id}`);
        if (hoverButton) {
            hoverButton.style.backgroundColor = 'transparent';
        }

        const editItem = document.getElementById(`js-edit-button-${id}`);

        Array.from(editItem?.children).forEach((item, index) => {
            if (item.getAttribute('dragHidden') === 'true') {
                item.style.display = 'inline-flex';
            }
        });

        this.props.onmouseleave();
    };

    handleMouseDown = (id) => {
        const item = document.getElementById(`js-button-${id}`);
        const editItem = document.getElementById(`js-edit-button-${id}`);

        if (editItem) {
            Array.from(editItem.children).forEach((item) => {
                if (item.getAttribute('drag') === 'true') {
                    item.style.display = 'none';
                }
            });
        }

        if (item) {
            item.onmousedown = this.props.ondragstart();
        }
    };

    handleMouseUp = (id) => {
        const editItem = document.getElementById(`js-edit-button-${id}`);

        Array.from(editItem?.children).forEach((item, index) => {
            if (item.getAttribute('drag') === 'true') {
                item.style.display = 'inline-flex';
            }
        });

        this.props.ondrop();
    };

    render() {
        const { id, ondrop, onshow, onedit, ondelete } = this.props;
        return (
            <div
                id={`js-edit-button-${id}`}
                className={cx('wrapper')}
                onMouseEnter={() => this.handleMouseEnter(id)}
                onMouseLeave={() => this.handleMouseLeave(id)}
            >
                <DefaultTippy content="Kéo thả để di chuyển mục">
                    <Button
                        draggable
                        className={cx('btn', 'drag')}
                        onMouseDown={() => this.handleMouseDown(id)}
                        onMouseUp={() => this.handleMouseUp(id)}
                    >
                        <RiDragMove2Fill />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Thêm mục mới">
                    <Button className={cx('btn', 'add')} onClick={onshow} drag="true">
                        <IoIosAddCircleOutline />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Sửa mục này">
                    <Button className={cx('btn', 'add')} onClick={onedit} drag="true">
                        <TfiPencil />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Xóa mục này">
                    <Button className={cx('btn', 'delete')} onClick={ondelete} drag="true">
                        <AiOutlineDelete />
                    </Button>
                </DefaultTippy>
            </div>
        );
    }
}

export default EditButton;
