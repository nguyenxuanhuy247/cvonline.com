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
        const button = document.getElementById(`js-button-${id}`);
        if (button) {
            button.classList.add(this.props.classHover);
        }

        this.props.onmouseenter();
    };

    handleMouseLeave = (id) => {
        const button = document.getElementById(`js-button-${id}`);
        if (button) {
            button.classList.remove(this.props.classHover);
        }

        const editItem = document.getElementById(`js-edit-button-${id}`);

        Array.from(editItem?.children).forEach((item) => {
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

    handleMouseUp = async (id) => {
        const result = await this.props.ondrop();
        // console.log('ON DROP :', result);

        const editItem = document.getElementById([`js-edit-button-${id}`]);
        if (result === 0) {
            editItem.style.display = 'none';
        } else {
            Array.from(editItem?.children).forEach((item) => {
                if (item.getAttribute('drag') === 'true') {
                    item.style.display = 'inline-flex';
                }
            });
        }
    };

    render() {
        const { id, onshow, onedit, ondelete } = this.props;
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
                        onDragEnd={() => console.log('drag')}
                        onDragStart={() => console.log('drag')}
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
