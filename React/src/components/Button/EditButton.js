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
    handleMouseEnter = (buttonID) => {
        const button = document.getElementById(buttonID);
        if (button) {
            button.classList.add(this.props.classHover);
        }

        this.props.onmouseenter();
    };

    handleMouseLeave = (buttonID, editButtonID) => {
        const button = document.getElementById(buttonID);
        const editButton = document.getElementById(editButtonID);

        if (button) {
            button.classList.remove(this.props.classHover);
        }

        Array.from(editButton?.children).forEach((item) => {
            if (item.getAttribute('drag') === 'true') {
                item.style.display = 'inline-flex';
            }
        });
        this.props.onmouseleave();
    };

    handleMouseDown = (buttonID, editButtonID) => {
        const button = document.getElementById(buttonID);
        const editItem = document.getElementById(editButtonID);

        if (editItem) {
            Array.from(editItem.children).forEach((item) => {
                if (item.getAttribute('drag') === 'true') {
                    item.style.display = 'none';
                }
            });
        }

        if (button) {
            button.onmousedown = this.props.ondragstart();

            button.onmouseup = function () {
                button.previousElementSibling.classList.remove(this.props.classHover);
                editItem.previousElementSibling.style.visibility = 'hidden';

                const allButtons = document.querySelectorAll(`[id*=js-button-${this.props.type}]`);
                const allEditButtons = document.querySelectorAll(`[id*=js-edit-button-${this.props.type}]`);

                allButtons.forEach((button) => button.classList.remove(cx('hover')));
                allEditButtons.forEach((editButton) => (editButton.style.visibility = 'hidden'));
            };
        }
    };

    handleMouseUp = async (editButtonID) => {
        const editItem = document.getElementById(editButtonID);

        if (editItem) {
            Array.from(editItem?.children).forEach((item) => {
                if (item.getAttribute('drag') === 'true') {
                    item.style.display = 'inline-flex';
                }
            });
        }
    };

    render() {
        const { editButtonID, buttonID, onShowCreateTechnology, onShowEditTechnology, onDeleteTechnology } = this.props;
        return (
            <div
                id={editButtonID}
                className={cx('wrapper')}
                onMouseEnter={() => this.handleMouseEnter(buttonID)}
                onMouseLeave={() => this.handleMouseLeave(buttonID, editButtonID)}
            >
                <DefaultTippy content="Kéo thả để di chuyển mục">
                    <Button
                        id={editButtonID}
                        draggable
                        className={cx('btn', 'drag')}
                        onMouseDown={() => this.handleMouseDown(buttonID, editButtonID)}
                        onMouseUp={() => this.handleMouseUp(editButtonID)}
                        ondragend={this.props.ondragend}
                    >
                        <RiDragMove2Fill />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Thêm mục mới">
                    <Button className={cx('btn', 'add')} onClick={onShowCreateTechnology} drag="true">
                        <IoIosAddCircleOutline />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Sửa mục này">
                    <Button className={cx('btn', 'add')} onClick={onShowEditTechnology} drag="true">
                        <TfiPencil />
                    </Button>
                </DefaultTippy>

                <DefaultTippy content="Xóa mục này">
                    <Button className={cx('btn', 'delete')} onClick={onDeleteTechnology} drag="true">
                        <AiOutlineDelete />
                    </Button>
                </DefaultTippy>
            </div>
        );
    }
}

export default EditButton;
